import pygame
import random
import sys
from settings import *
from sprites import Player, Asteroid, Projectile

# Inicialização do Pygame
pygame.init()
pygame.mixer.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Jogo de Nave Atari")
clock = pygame.time.Clock()

font_name = pygame.font.match_font('arial')

def draw_text(surf, text, size, x, y):
    """Função auxiliar para desenhar texto na tela"""
    font = pygame.font.Font(font_name, size)
    text_surface = font.render(text, True, WHITE)
    text_rect = text_surface.get_rect()
    text_rect.midtop = (x, y)
    surf.blit(text_surface, text_rect)

def spawn_asteroid(all_sprites, asteroids):
    """Função para instanciar novos asteroides"""
    a = Asteroid()
    all_sprites.add(a)
    asteroids.add(a)

def game_loop():
    # Grupos de sprites para facilitar o controle de colisão e desenho
    all_sprites = pygame.sprite.Group()
    asteroids = pygame.sprite.Group()
    projectiles = pygame.sprite.Group()
    
    # Criar jogador
    player = Player()
    all_sprites.add(player)
    
    # Gerar onda inicial de asteroides
    for i in range(8):
        spawn_asteroid(all_sprites, asteroids)
        
    score = 0
    running = True
    game_over = False
    
    while running:
        # Manter o jogo rodando no FPS correto
        clock.tick(FPS)
        
        # Processamento de eventos (inputs)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE and not game_over:
                    player.shoot(all_sprites, projectiles)
                elif event.key == pygame.K_r and game_over:
                    return True # Reiniciar jogo
        
        if not game_over:
            # Atualização do estado do jogo (update)
            all_sprites.update()
            
            # Verificar colisão: projétil atinge asteroide
            hits = pygame.sprite.groupcollide(asteroids, projectiles, True, True)
            for hit in hits:
                score += 10
                spawn_asteroid(all_sprites, asteroids)
                
            # Verificar colisão: jogador atinge asteroide
            hits = pygame.sprite.spritecollide(player, asteroids, False)
            if hits:
                game_over = True
                
            # Verificar se algum asteroide chegou ao fundo da tela
            for a in asteroids:
                if a.rect.top > HEIGHT:
                    game_over = True
        
        # Renderização (draw)
        screen.fill(BLACK)
        all_sprites.draw(screen)
        
        # Mostrar pontuação no canto superior esquerdo
        draw_text(screen, f"Pontos: {score}", 24, 70, 10)
        
        if game_over:
            draw_text(screen, "GAME OVER", 64, WIDTH / 2, HEIGHT / 4)
            draw_text(screen, "Pressione 'R' para reiniciar", 22, WIDTH / 2, HEIGHT / 2)
            
        # Inverter o buffer para exibir na tela (flip)
        pygame.display.flip()
        
    return False

def main():
    while True:
        # Loop para reiniciar o jogo quando game_loop retorna True
        play_again = game_loop()
        if not play_again:
            break
            
    pygame.quit()
    sys.exit()

if __name__ == '__main__':
    main()
