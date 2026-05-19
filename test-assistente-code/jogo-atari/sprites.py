import pygame
import random
from settings import *

class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        # Usando forma geométrica preenchida para a nave
        self.image = pygame.Surface((50, 40))
        self.image.fill(GREEN)
        self.rect = self.image.get_rect()
        self.rect.centerx = WIDTH // 2
        self.rect.bottom = HEIGHT - 20
        self.speedx = 0

    def update(self):
        self.speedx = 0
        keystate = pygame.key.get_pressed()
        if keystate[pygame.K_LEFT]:
            self.speedx = -PLAYER_SPEED
        if keystate[pygame.K_RIGHT]:
            self.speedx = PLAYER_SPEED
            
        self.rect.x += self.speedx
        
        # Manter a nave dentro da tela
        if self.rect.right > WIDTH:
            self.rect.right = WIDTH
        if self.rect.left < 0:
            self.rect.left = 0

    def shoot(self, all_sprites, projectiles):
        projectile = Projectile(self.rect.centerx, self.rect.top)
        all_sprites.add(projectile)
        projectiles.add(projectile)

class Asteroid(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        # Usando forma geométrica preenchida para o asteroide
        self.image = pygame.Surface((30, 30))
        self.image.fill(RED)
        self.rect = self.image.get_rect()
        # Iniciar em posição aleatória no topo
        self.rect.x = random.randrange(WIDTH - self.rect.width)
        self.rect.y = random.randrange(-100, -40)
        self.speedy = random.randrange(ASTEROID_SPEED_MIN, ASTEROID_SPEED_MAX)

    def update(self):
        self.rect.y += self.speedy

class Projectile(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        # Usando forma geométrica preenchida para o projétil
        self.image = pygame.Surface((5, 10))
        self.image.fill(YELLOW)
        self.rect = self.image.get_rect()
        self.rect.bottom = y
        self.rect.centerx = x
        self.speedy = PROJECTILE_SPEED

    def update(self):
        self.rect.y += self.speedy
        # Remover projétil quando sair da tela
        if self.rect.bottom < 0:
            self.kill()
