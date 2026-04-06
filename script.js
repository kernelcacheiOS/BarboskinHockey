// Простая инициализация для тестирования
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен');
    
    // Проверяем, первый ли это визит
    const isFirstVisit = !localStorage.getItem('barboskinHockeyVisited');
    
    if (isFirstVisit) {
        // Показываем приветственное окно при первом визите
        showWelcomeModal();
        // Отмечаем, что пользователь уже посещал игру
        localStorage.setItem('barboskinHockeyVisited', 'true');
    }
    
    const playButton = document.getElementById('playButton');
    const settingsButton = document.getElementById('settingsButton');
    const backButton = document.getElementById('backButton');
    const mainMenu = document.getElementById('mainMenu');
    const characterSelectScreen = document.getElementById('characterSelectScreen');
    const settingsScreen = document.getElementById('settingsScreen');
    const gameContainer = document.getElementById('gameContainer');
    
    console.log('playButton:', playButton);
    console.log('settingsButton:', settingsButton);
    console.log('backButton:', backButton);
    console.log('mainMenu:', mainMenu);
    console.log('characterSelectScreen:', characterSelectScreen);
    console.log('settingsScreen:', settingsScreen);
    console.log('gameContainer:', gameContainer);
    
    if (playButton) {
        console.log('Кнопка PLAY найдена, добавляем обработчик');
        
        playButton.addEventListener('click', function() {
            console.log('КЛИК ПО КНОПКЕ PLAY!');
            
            // Переход к экрану выбора персонажа
            mainMenu.style.display = 'none';
            characterSelectScreen.style.display = 'flex';
            characterSelectScreen.classList.add('fade-in');
        });
        
        // Touch события для мобильных
        playButton.addEventListener('touchstart', function(e) {
            console.log('Touch start на кнопке PLAY');
            e.preventDefault();
        });
        
        playButton.addEventListener('touchend', function(e) {
            console.log('Touch end на кнопке PLAY');
            e.preventDefault();
            // Вызываем клик
            this.click();
        });
    } else {
        console.error('Кнопка PLAY НЕ НАЙДЕНА!');
    }
    
    // Обработчик кнопки НАСТРОЙКИ
    if (settingsButton) {
        console.log('Кнопка НАСТРОЙКИ найдена, добавляем обработчик');
        
        settingsButton.addEventListener('click', function() {
            console.log('КЛИК ПО КНОПКЕ НАСТРОЙКИ!');
            
            // Переход к экрану настроек
            mainMenu.style.display = 'none';
            settingsScreen.style.display = 'flex';
            settingsScreen.classList.add('fade-in');
        });
        
        // Touch события для мобильных
        settingsButton.addEventListener('touchstart', function(e) {
            console.log('Touch start на кнопке НАСТРОЙКИ');
            e.preventDefault();
        });
        
        settingsButton.addEventListener('touchend', function(e) {
            console.log('Touch end на кнопке НАСТРОЙКИ');
            e.preventDefault();
            // Вызываем клик
            this.click();
        });
    } else {
        console.error('Кнопка НАСТРОЙКИ НЕ НАЙДЕНА!');
    }
    
    // Обработчик кнопки НАЗАД
    if (backButton) {
        console.log('Кнопка НАЗАД найдена, добавляем обработчик');
        
        backButton.addEventListener('click', function() {
            console.log('КЛИК ПО КНОПКЕ НАЗАД!');
            
            // Плавный возврат к главному меню без задержки
            settingsScreen.classList.add('fade-out');
            mainMenu.style.display = 'flex';
            
            // Убираем классы после завершения анимации
            setTimeout(() => {
                settingsScreen.style.display = 'none';
                settingsScreen.classList.remove('fade-in', 'fade-out');
            }, 300); // Уменьшил с 800ms до 300ms
        });
        
        // Touch события для мобильных
        backButton.addEventListener('touchstart', function(e) {
            console.log('Touch start на кнопке НАЗАД');
            e.preventDefault();
        });
        
        backButton.addEventListener('touchend', function(e) {
            console.log('Touch end на кнопке НАЗАД');
            e.preventDefault();
            // Вызываем клик
            this.click();
        });
    } else {
        console.error('Кнопка НАЗАД НЕ НАЙДЕНА!');
    }
    
    // Обработчики выбора персонажа
    const characterCards = document.querySelectorAll('.character-card');
    const characterSelectBtns = document.querySelectorAll('.character-select-btn');
    
    // Функция выбора персонажа
    function selectCharacter(character) {
        console.log('Выбран персонаж:', character);
        
        // Сохраняем выбранного персонажа
        localStorage.setItem('selectedCharacter', character);
        
        // Переход к игровой арене
        characterSelectScreen.classList.add('fade-out');
        gameContainer.style.display = 'flex';
        
        setTimeout(() => {
            characterSelectScreen.style.display = 'none';
            characterSelectScreen.classList.remove('fade-in', 'fade-out');
            
            // Сбрасываем состояние игры перед инициализацией
            gameEnded = false;
            playerScore = 0;
            botScore = 0;
            
            initializeGame();
        }, 300);
    }
    
    // Обработчики для кнопок выбора (приоритет для мобильных)
    characterSelectBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Предотвращаем всплытие события
            const character = this.dataset.character;
            console.log('Кнопка выбора нажата:', character);
            selectCharacter(character);
        });
        
        // Touch события для кнопок
        btn.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const character = this.dataset.character;
            console.log('Touch на кнопке выбора:', character);
            selectCharacter(character);
        });
    });
    
    // Обработчики для карточек персонажей (для десктопа и резерв для мобильных)
    characterCards.forEach(card => {
        // Click событие для десктопа
        card.addEventListener('click', function(e) {
            // Проверяем, что клик не по кнопке
            if (!e.target.classList.contains('character-select-btn')) {
                const character = card.dataset.character;
                console.log('Клик по карточке персонажа:', character);
                selectCharacter(character);
            }
        });
        
        // Touch события для мобильных (резервный вариант)
        let touchStarted = false;
        
        card.addEventListener('touchstart', function(e) {
            // Если touch по кнопке, не обрабатываем
            if (e.target.classList.contains('character-select-btn')) {
                return;
            }
            
            touchStarted = true;
            this.classList.add('touching');
            console.log('Touch start на карточке персонажа:', card.dataset.character);
        });
        
        card.addEventListener('touchend', function(e) {
            // Если touch по кнопке, не обрабатываем
            if (e.target.classList.contains('character-select-btn')) {
                return;
            }
            
            this.classList.remove('touching');
            
            if (touchStarted) {
                touchStarted = false;
                e.preventDefault();
                const character = card.dataset.character;
                console.log('Touch end на карточке - выбираем персонажа:', character);
                selectCharacter(character);
            }
        });
        
        card.addEventListener('touchcancel', function(e) {
            touchStarted = false;
            this.classList.remove('touching');
        });
    });
    
    // Обработка никнейма
    const nicknameInput = document.getElementById('nicknameInput');
    if (nicknameInput) {
        // Загружаем сохраненный никнейм
        const savedNickname = localStorage.getItem('playerNickname');
        if (savedNickname) {
            nicknameInput.value = savedNickname;
        }
        
        // Сохраняем никнейм при изменении
        nicknameInput.addEventListener('input', function() {
            localStorage.setItem('playerNickname', this.value);
            console.log('Никнейм сохранен:', this.value);
        });
        
        // Обработка Enter
        nicknameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                this.blur(); // Убираем фокус
            }
        });
    }
    
    // Инициализируем отображение ELO при загрузке страницы
    const eloElement = document.getElementById('currentElo');
    if (eloElement) {
        const savedElo = parseInt(localStorage.getItem('playerElo')) || 0;
        eloElement.textContent = savedElo;
        console.log('💾 ELO загружен из localStorage:', savedElo);
    }
    
    // Обработка ссылки на Telegram канал
    const telegramLink = document.getElementById('telegramLink');
    if (telegramLink) {
        telegramLink.addEventListener('click', function(e) {
            console.log('Переход в Telegram канал');
            // Ссылка откроется автоматически благодаря target="_blank"
        });
    }
    
    // Обработчики кнопок экрана результатов
    const backToMenuButton = document.getElementById('backToMenuButton');
    const resultScreen = document.getElementById('gameResultScreen');
    
    if (backToMenuButton) {
        backToMenuButton.addEventListener('click', function() {
            console.log('Возврат в главное меню');
            
            // Скрываем экран результатов
            resultScreen.classList.add('fade-out');
            
            setTimeout(() => {
                resultScreen.style.display = 'none';
                resultScreen.classList.remove('fade-in', 'fade-out');
                
                // Показываем главное меню
                mainMenu.style.display = 'flex';
                
                // Полностью останавливаем игру
                gameEnded = true;
                if (animationId) {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }
                
                // Сбрасываем счет и позиции персонажей
                playerScore = 0;
                botScore = 0;
                updateScore();
                resetCharacterPositions();
            }, 400);
        });
    }
});

// Глобальные переменные для игры
let ballVelocityX = 0;
let ballVelocityY = 0;
let ballX = 50;
let ballY = 50;
let isMoving = false;
let animationId = null;
let lastCollisionTime = 0;
let isPlayerTouching = false;
let isBotTouching = false;
let playerPushDirection = { x: 0, y: 0 };
let botPushDirection = { x: 0, y: 0 };
let playerScore = 0;
let botScore = 0;
let maxScore = 3;
let gameEnded = false;
let currentElo = parseInt(localStorage.getItem('playerElo')) || 0;

// Переменные для ИИ бота
let botTargetX = 85; // Целевая позиция бота по X
let botTargetY = 50; // Целевая позиция бота по Y
let botMoveSpeed = 3.0; // Умеренная базовая скорость движения бота
let botReactionTime = 0; // Время реакции бота
let botLastUpdate = 0; // Последнее обновление ИИ
let botStrategy = 'first_attack'; // Стратегия: начинаем с атаки!

// Коэффициенты физики для реалистичного аэрохоккея
const friction = 0.996;
const minVelocity = 0.01;
const pushForce = 15;
const continuousPushForce = 8;
const maxSpeed = 30;
const collisionCooldown = 50;

// Функция инициализации игры
function initializeGame() {
    console.log('Инициализация игры...');
    
    const arena = document.querySelector('.hockey-arena');
    const hockeyBall = document.querySelector('.hockey-ball');
    const interactiveZones = document.querySelectorAll('.zone-click');
    const selectedCharacterDiv = document.getElementById('selectedCharacter');
    const characterAvatar = document.querySelector('.character-avatar');
    
    // Показываем выбранного персонажа
    const selectedCharacter = localStorage.getItem('selectedCharacter');
    if (selectedCharacter && characterAvatar) {
        let characterImage = '';
        switch(selectedCharacter) {
            case 'malish':
                characterImage = 'resources/malish2.png';
                break;
            case 'genka':
                characterImage = 'resources/genka2.png';
                break;
            case 'drushok':
                characterImage = 'resources/drushok2.png';
                break;
            default:
                characterImage = 'resources/malish2.png'; // По умолчанию Малыш
        }
        
        characterAvatar.src = characterImage;
        characterAvatar.alt = selectedCharacter;
        selectedCharacterDiv.classList.add('fade-in');
        console.log('Показан персонаж:', selectedCharacter);
        
        // Устанавливаем начальную позицию персонажа (не восстанавливаем сохраненную)
        selectedCharacterDiv.style.left = '15%';
        selectedCharacterDiv.style.top = '50%';
        
        // Добавляем функциональность перетаскивания
        makeDraggable(selectedCharacterDiv);
    }
    
    // Создаем случайного бота
    const botCharacterDiv = document.getElementById('botCharacter');
    const botAvatar = botCharacterDiv.querySelector('.character-avatar');
    const botLabel = document.getElementById('botLabel');
    
    if (botCharacterDiv && botAvatar && botLabel) {
        const botCharacters = ['malish', 'genka', 'drushok'];
        const playerCharacter = selectedCharacter || 'malish';
        
        // Исключаем персонажа игрока из выбора бота
        const availableBots = botCharacters.filter(char => char !== playerCharacter);
        const randomBot = availableBots[Math.floor(Math.random() * availableBots.length)];
        
        let botImage = '';
        let botName = '';
        
        switch(randomBot) {
            case 'malish':
                botImage = 'resources/malish2.png';
                botName = 'Малыш';
                break;
            case 'genka':
                botImage = 'resources/genka2.png';
                botName = 'Генка';
                break;
            case 'drushok':
                botImage = 'resources/drushok2.png';
                botName = 'Дружок';
                break;
        }
        
        botAvatar.src = botImage;
        botAvatar.alt = randomBot;
        botLabel.textContent = `BOT (${botName})`;
        botCharacterDiv.classList.add('fade-in');
        console.log('Создан бот:', randomBot);
    }
    
    // Показываем никнейм игрока
    const playerNicknameDiv = document.getElementById('playerNickname');
    if (playerNicknameDiv) {
        const savedNickname = localStorage.getItem('playerNickname');
        if (savedNickname && savedNickname.trim() !== '') {
            playerNicknameDiv.textContent = savedNickname;
        } else {
            playerNicknameDiv.textContent = 'Игрок';
        }
    }
    
    if (arena) {
        // Добавляем анимацию при загрузке
        arena.style.opacity = '0';
        arena.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            arena.style.transition = 'all 0.8s ease-out';
            arena.style.opacity = '1';
            arena.style.transform = 'scale(1)';
        }, 100);
    }
    
    // Добавляем интерактивность к хоккейному мячу
    if (hockeyBall) {
        
        // Функция запуска анимации
        function startBallMovement() {
            if (!isMoving) {
                isMoving = true;
                hockeyBall.classList.add('moving');
            }
            if (!animationId && !gameEnded) {
                animateBall();
            }
        }
        
        // Функция проверки голов
        function checkGoals() {
            if (gameEnded) return false;
            
            const arena = document.querySelector('.hockey-arena');
            const arenaRect = arena.getBoundingClientRect();
            
            // Конвертируем позицию мяча в пиксели
            const ballPixelX = (ballX / 100) * arenaRect.width;
            const ballPixelY = (ballY / 100) * arenaRect.height;
            
            // Размеры зоны ворот (8% ширины, 40% высоты, по центру по вертикали)
            const goalWidth = arenaRect.width * 0.08;
            const goalHeight = arenaRect.height * 0.4;
            const goalTop = arenaRect.height * 0.3;
            const goalBottom = goalTop + goalHeight;
            
            // Проверка правых ворот (игрок забивает боту - это ворота бота)
            if (ballPixelX >= (arenaRect.width - goalWidth) && ballPixelY >= goalTop && ballPixelY <= goalBottom) {
                playerScore++;
                console.log(`⚽ ГОЛ! Игрок забил в ворота бота (правые)! Счет: ${playerScore}:${botScore}`);
                updateScore();
                
                // Сбрасываем мяч и позиции с задержкой
                setTimeout(() => {
                    resetBall();
                }, 500);
                
                if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 100]);
                return true;
            }
            
            // Проверка левых ворот (бот забивает игроку - это ворота игрока)
            if (ballPixelX <= goalWidth && ballPixelY >= goalTop && ballPixelY <= goalBottom) {
                botScore++;
                console.log(`⚽ ГОЛ! Бот забил в ворота игрока (левые)! Счет: ${playerScore}:${botScore}`);
                updateScore();
                
                // Сбрасываем мяч и позиции с задержкой
                setTimeout(() => {
                    resetBall();
                }, 500);
                
                if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
                return true;
            }
            
            return false;
        }
        
        // Функция обновления счета на экране
        function updateScore() {
            const playerScoreElement = document.getElementById('playerScore');
            const botScoreElement = document.getElementById('botScore');
            
            if (playerScoreElement) playerScoreElement.textContent = playerScore;
            if (botScoreElement) botScoreElement.textContent = botScore;
            
            // Обновляем ELO в настройках
            updateEloDisplay();
            
            // Проверяем окончание игры
            if (playerScore >= maxScore || botScore >= maxScore) {
                endGame();
            }
        }
        
        // Функция ИИ бота
        function updateBotAI() {
            const currentTime = Date.now();
            if (currentTime - botLastUpdate < 15) return; // Еще быстрее реакция
            botLastUpdate = currentTime;
            
            const botCharacter = document.getElementById('botCharacter');
            if (!botCharacter || gameEnded) return;
            
            // Получаем текущую позицию бота
            const botRect = botCharacter.getBoundingClientRect();
            const arena = document.querySelector('.hockey-arena');
            const arenaRect = arena.getBoundingClientRect();
            
            const botCurrentX = ((botRect.left + botRect.width/2 - arenaRect.left) / arenaRect.width) * 100;
            const botCurrentY = ((botRect.top + botRect.height/2 - arenaRect.top) / arenaRect.height) * 100;
            
            // Получаем позицию игрока для проверки зоны исключения
            const playerCharacter = document.getElementById('selectedCharacter');
            let playerX = 15; // По умолчанию
            let playerY = 50;
            
            if (playerCharacter) {
                const playerRect = playerCharacter.getBoundingClientRect();
                playerX = ((playerRect.left + playerRect.width/2 - arenaRect.left) / arenaRect.width) * 100;
                playerY = ((playerRect.top + playerRect.height/2 - arenaRect.top) / arenaRect.height) * 100;
            }
            
            // Проверяем если игрок очень близко к воротам бота (правая сторона)
            const playerNearBotGoal = playerX > 85 && playerY > 25 && playerY < 75; // Игрок в зоне ворот бота
            const goalExclusionZone = playerX > 88; // Зона исключения для бота
            
            // Анализируем ситуацию
            const ballSpeed = Math.sqrt(ballVelocityX * ballVelocityX + ballVelocityY * ballVelocityY);
            const ballMovingToBotGoal = ballVelocityX > 0.8 && ballX > 65; // Мяч движется к воротам бота
            const ballMovingToPlayerGoal = ballVelocityX < -0.8 && ballX < 35; // Мяч движется к воротам игрока
            const distanceToBall = Math.sqrt(Math.pow(ballX - botCurrentX, 2) + Math.pow(ballY - botCurrentY, 2));
            const ballVeryNearBotGoal = ballX > 85; // Мяч очень близко к воротам бота (было 88)
            const ballNearBotGoal = ballX > 78; // Мяч близко к воротам бота (было 82)
            const ballInCriticalZone = ballX > 70 && ballSpeed > 1.0; // Критическая зона (было 75)
            const ballInPlayerHalf = ballX < 45; // Мяч в половине игрока
            const ballInCenter = ballX >= 45 && ballX <= 65; // Мяч в центре
            
            // СБАЛАНСИРОВАННАЯ логика - бот может и атаковать первым, и защищать ворота
            if (ballVeryNearBotGoal) {
                botStrategy = 'emergency_defend'; // Экстренная защита - активно отбиваем
            } else if (ballNearBotGoal) {
                botStrategy = 'strong_defend'; // Сильная защита когда мяч близко
            } else if (ballInCriticalZone) {
                botStrategy = 'defend_and_counter'; // Защита в критической зоне
            } else if (ballInPlayerHalf) {
                botStrategy = 'aggressive_attack'; // АТАКУЕМ ПЕРВЫМИ когда мяч у игрока!
            } else if (ballInCenter) {
                botStrategy = 'first_attack'; // Атакуем первыми в центре
            } else if (distanceToBall < 25) {
                botStrategy = 'aggressive_attack'; // Агрессивная атака когда близко к мячу
            } else if (ballX > 60) {
                botStrategy = 'defend_and_counter'; // Защита с контратакой в своей половине
            } else {
                botStrategy = 'first_attack'; // По умолчанию атакуем первыми!
            }
            
            // Выполняем стратегию
            switch (botStrategy) {
                case 'emergency_defend':
                    // Экстренная защита - АКТИВНО УДАРЯЕМ по мячу для отбивания
                    if (ballY < 35 || ballY > 65) {
                        // Мяч в углу ворот - позиционируемся для МОЩНОГО УДАРА
                        if (ballY < 35) {
                            // Верхний угол - встаем для мощного удара вниз-влево
                            botTargetX = Math.max(85, ballX - 5);
                            botTargetY = Math.max(15, ballY + 12); // Встаем НИЖЕ для удара вверх
                        } else {
                            // Нижний угол - встаем для мощного удара вверх-влево
                            botTargetX = Math.max(85, ballX - 5);
                            botTargetY = Math.min(85, ballY - 12); // Встаем ВЫШЕ для удара вниз
                        }
                        botMoveSpeed = 5.0; // Максимальная скорость для мощного удара
                        console.log('� Экстренная защита: готовимся к МОЩНОМУ удару из угла!');
                    } else if (goalExclusionZone && playerNearBotGoal) {
                        // Игрок в воротах - держимся на расстоянии но готовы ударить
                        botTargetX = 82;
                        botTargetY = Math.max(25, Math.min(75, ballY));
                        botMoveSpeed = 4.5;
                        console.log('🚫 Экстренная защита: игрок в воротах, готовы к удару');
                    } else {
                        // Стандартная экстренная защита - встаем для МОЩНОГО отбивающего удара
                        botTargetX = Math.max(88, ballX - 4); // Встаем СБОКУ для удара
                        if (ballY < 45) {
                            botTargetY = Math.max(20, ballY + 8); // Встаем ниже для удара вверх-влево
                        } else {
                            botTargetY = Math.min(80, ballY - 8); // Встаем выше для удара вниз-влево
                        }
                        botMoveSpeed = 4.8; // Очень высокая скорость для удара
                        console.log('💥 Экстренная защита: позиционируемся для МОЩНОГО отбивающего удара!');
                    }
                    break;
                    
                case 'strong_defend':
                    // Сильная защита - готовимся к мощному отбивающему удару
                    if (ballY < 30 || ballY > 70) {
                        // Мяч близко к углу - позиционируемся для мощного удара
                        if (ballY < 30) {
                            // Верхний угол - встаем для удара к центру поля
                            botTargetX = Math.max(85, ballX - 3);
                            botTargetY = Math.max(15, ballY + 15); // Встаем значительно ниже для мощного удара
                        } else {
                            // Нижний угол - встаем для удара к центру поля
                            botTargetX = Math.max(85, ballX - 3);
                            botTargetY = Math.min(85, ballY - 15); // Встаем значительно выше для мощного удара
                        }
                        botMoveSpeed = 4.5;
                        console.log('� Сильная защита: готовимся к мощному удару из угла!');
                    } else if (goalExclusionZone && playerNearBotGoal) {
                        // Игрок в воротах - защитная позиция
                        const defenseX = Math.max(78, Math.min(85, ballX + 2));
                        botTargetX = defenseX;
                        botTargetY = Math.max(20, Math.min(80, ballY));
                        botMoveSpeed = 4.0;
                        console.log('🚫 Сильная защита: игрок в воротах');
                    } else {
                        // Стандартная сильная защита - встаем для отбивающего удара
                        botTargetX = Math.max(85, ballX - 2); // Сбоку от мяча для удара
                        
                        // Позиционируемся для удара К ЦЕНТРУ поля
                        if (ballY < 40) {
                            botTargetY = Math.max(20, ballY + 12); // Встаем ниже для удара вверх-влево
                        } else if (ballY > 60) {
                            botTargetY = Math.min(80, ballY - 12); // Встаем выше для удара вниз-влево
                        } else {
                            // Мяч по центру - встаем сбоку для удара влево
                            botTargetY = Math.max(20, Math.min(80, ballY));
                        }
                        botMoveSpeed = 4.2;
                    }
                    break;
                    
                case 'defend_and_counter':
                    // Защита с подготовкой к контратаке - ИСПРАВЛЕННАЯ
                    if (ballSpeed > 2 && ballMovingToBotGoal) {
                        // Быстрый мяч движется к воротам - приоритет защите
                        botTargetX = Math.max(88, Math.min(93, ballX + 3)); // В пределах арены
                        botTargetY = Math.max(15, Math.min(85, ballY + (50 - ballY) * 0.1));
                        botMoveSpeed = 4.0; // Быстрая защита
                        console.log('🛡️ Защита с контратакой: быстрый мяч к воротам!');
                    } else {
                        // Стандартная защита с подготовкой к контратаке
                        botTargetX = Math.max(85, Math.min(90, ballX + 4)); // В пределах арены
                        botTargetY = Math.max(15, Math.min(85, ballY + (50 - ballY) * 0.3));
                        botMoveSpeed = 3.5;
                    }
                    break;
                    
                case 'first_attack':
                    // ПЕРВАЯ АТАКА - активно идем к мячу для атаки
                    if (ballX < 30) {
                        // Мяч очень далеко в половине игрока - ГЛУБОКАЯ АТАКА
                        botTargetX = Math.max(25, ballX - 3); // Заходим ОЧЕНЬ глубоко!
                        botTargetY = ballY;
                        botMoveSpeed = 4.0; // Быстро атакуем
                        console.log('🔥 Первая атака: ГЛУБОКАЯ атака в половину игрока!');
                    } else if (ballX < 50) {
                        // Мяч в центральной зоне - активно атакуем
                        botTargetX = Math.max(35, ballX - 2);
                        botTargetY = ballY;
                        botMoveSpeed = 3.8;
                        console.log('⚡ Первая атака: атакуем в центре поля!');
                    } else {
                        // Мяч ближе к нашей половине - позиционируемся для атаки
                        botTargetX = Math.max(50, ballX + 2);
                        botTargetY = ballY;
                        botMoveSpeed = 3.5;
                    }
                    break;
                    
                case 'aggressive_attack':
                    // АГРЕССИВНАЯ АТАКА - идем прямо к мячу для мощного удара
                    if (ballX < 25) {
                        // Мяч у ворот игрока - МАКСИМАЛЬНО АГРЕССИВНАЯ АТАКА
                        botTargetX = Math.max(20, ballX - 5); // Заходим к самым воротам игрока!
                        botTargetY = ballY;
                        botMoveSpeed = 4.5; // Максимальная скорость атаки
                        console.log('💥 СУПЕР АГРЕССИВНАЯ АТАКА: идем к воротам игрока!');
                    } else if (ballX < 40) {
                        // Мяч в половине игрока - сильная атака
                        botTargetX = Math.max(30, ballX - 3);
                        botTargetY = ballY;
                        botMoveSpeed = 4.2;
                        console.log('🔥 Агрессивная атака: атакуем в половине игрока!');
                    } else if (distanceToBall > 15) {
                        // Быстро приближаемся к мячу где бы он ни был
                        botTargetX = Math.max(35, ballX - 1);
                        botTargetY = ballY;
                        botMoveSpeed = 3.8;
                    } else {
                        // Близко к мячу - позиционируемся для точного удара в ворота игрока
                        const goalCenterY = 50;
                        const goalX = 8; // Ворота игрока
                        const attackAngle = Math.atan2(goalCenterY - ballY, goalX - ballX);
                        botTargetX = Math.max(35, ballX + Math.cos(attackAngle + Math.PI) * 8);
                        botTargetY = ballY + Math.sin(attackAngle + Math.PI) * 8;
                        botMoveSpeed = 3.5;
                        console.log('🎯 Позиционируемся для точного удара в ворота!');
                    }
                    break;
                    
                case 'hunt_ball':
                    // ОХОТА ЗА МЯЧОМ - активно преследуем мяч по всему полю
                    if (ballX < 35) {
                        // Мяч в половине игрока - агрессивно преследуем
                        botTargetX = Math.max(25, ballX - 2);
                        botTargetY = ballY + (Math.random() - 0.5) * 6; // Небольшая непредсказуемость
                        botMoveSpeed = 4.0;
                        console.log('🏃 Охота за мячом: преследуем в половине игрока!');
                    } else if (ballX < 55) {
                        // Мяч в центре - активно охотимся
                        botTargetX = Math.max(40, ballX - 1);
                        botTargetY = ballY + (Math.random() - 0.5) * 4;
                        botMoveSpeed = 3.5;
                    } else {
                        // Мяч в нашей половине - стандартная охота
                        botTargetX = Math.max(60, ballX + 2);
                        botTargetY = ballY + (Math.random() - 0.5) * 8;
                        botMoveSpeed = 3.2;
                    }
                    break;
            }
            
            // РАСШИРЕННЫЕ границы для АТАКУЮЩЕГО бота - может заходить на середину поля!
            let minBotX = 20; // Может заходить до 20% - почти к воротам игрока!
            let maxBotX = 95; // Максимум 95% - не выходим за границы арены
            
            if (goalExclusionZone && playerNearBotGoal) {
                maxBotX = 85; // Бот не может зайти в зону ворот если там игрок
                console.log('🚫 Игрок блокирует зону ворот бота - бот не может туда зайти');
            }
            
            // При атаке бот может заходить ОЧЕНЬ глубоко
            if (botStrategy === 'aggressive_attack' || botStrategy === 'first_attack') {
                minBotX = 15; // При атаке может заходить еще глубже!
                console.log(`🔥 ${botStrategy}: бот может заходить до ${minBotX}%!`);
            }
            
            botTargetX = Math.min(maxBotX, Math.max(minBotX, botTargetX)); // Расширенные границы!
            botTargetY = Math.min(90, Math.max(10, botTargetY)); // Границы по Y 10-90%
            
            // Очень плавное и точное движение
            const deltaX = botTargetX - botCurrentX;
            const deltaY = botTargetY - botCurrentY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            if (distance > 0.5) { // Увеличили порог для более стабильного движения
                // Плавное движение с ограничением скорости
                const maxMoveDistance = botMoveSpeed * 0.8; // Уменьшили множитель для плавности
                const actualMoveDistance = Math.min(maxMoveDistance, distance);
                
                const moveX = (deltaX / distance) * actualMoveDistance;
                const moveY = (deltaY / distance) * actualMoveDistance;
                
                const newX = botCurrentX + moveX;
                const newY = botCurrentY + moveY;
                
                // СТРОГИЕ ограничения границ - бот НЕ может выходить за пределы
                const constrainedX = Math.min(95, Math.max(35, newX)); // Строже границы
                const constrainedY = Math.min(92, Math.max(8, newY)); // Строже границы
                
                // Применяем позицию только если она в допустимых пределах
                // И НЕ конфликтует с игроком в зоне ворот
                const finalMaxX = (goalExclusionZone && playerNearBotGoal) ? 85 : 95;
                
                if (constrainedX >= 35 && constrainedX <= finalMaxX && constrainedY >= 8 && constrainedY <= 92) {
                    // Дополнительная проверка: не заходим в зону игрока у ворот
                    const distanceToPlayer = Math.sqrt(Math.pow(constrainedX - playerX, 2) + Math.pow(constrainedY - playerY, 2));
                    
                    if (!(goalExclusionZone && playerNearBotGoal && distanceToPlayer < 12)) {
                        botCharacter.style.left = constrainedX + '%';
                        botCharacter.style.top = constrainedY + '%';
                    }
                }
            }
            
            // Логирование для отладки
            if (Math.random() < 0.02) {
                console.log(`🤖 СТАБИЛЬНЫЙ БОТ: ${botStrategy}, скорость: ${botMoveSpeed.toFixed(1)}, позиция: ${botCurrentX.toFixed(1)}x${botCurrentY.toFixed(1)}, цель: ${botTargetX.toFixed(1)}x${botTargetY.toFixed(1)}`);
            }
        }
        
        // Функция сброса позиций персонажей
        function resetCharacterPositions() {
            const selectedCharacterDiv = document.getElementById('selectedCharacter');
            const botCharacterDiv = document.getElementById('botCharacter');
            
            // Сбрасываем позицию игрока в левую сторону
            if (selectedCharacterDiv) {
                selectedCharacterDiv.style.left = '15%';
                selectedCharacterDiv.style.top = '50%';
                console.log('🔄 Позиция игрока сброшена в начальное место');
            }
            
            // Сбрасываем позицию бота в правую сторону
            if (botCharacterDiv) {
                botCharacterDiv.style.left = '85%';
                botCharacterDiv.style.top = '50%';
                console.log('🔄 Позиция бота сброшена в начальное место');
            }
            
            // Сбрасываем ИИ бота
            botTargetX = 85;
            botTargetY = 50;
            botStrategy = 'first_attack'; // Начинаем с агрессивной атаки
            botMoveSpeed = 3.8;
            
            // Очищаем сохраненную позицию из localStorage
            localStorage.removeItem('characterPosition');
        }
        
        // Функция сброса мяча в центр
        function resetBall() {
            console.log('🔄 Начинаем сброс мяча и персонажей');
            
            ballX = 50;
            ballY = 50;
            ballVelocityX = 0;
            ballVelocityY = 0;
            isMoving = false;
            isPlayerTouching = false;
            isBotTouching = false;
            
            hockeyBall.style.left = ballX + '%';
            hockeyBall.style.top = ballY + '%';
            hockeyBall.classList.remove('moving', 'touching');
            
            // Сбрасываем позиции персонажей после каждого гола
            resetCharacterPositions();
            
            console.log('✅ Мяч и персонажи сброшены, анимация продолжается');
        }
        
        // Функция окончания игры
        function endGame() {
            gameEnded = true;
            isMoving = false;
            
            // Останавливаем анимацию
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
                console.log('🛑 Анимация остановлена при окончании игры');
            }
            
            const playerWon = playerScore >= maxScore;
            const finalScore = `${playerScore}:${botScore}`;
            
            // Вычисляем изменение ELO
            let eloChange;
            if (playerWon) {
                eloChange = 10;
            } else {
                // Проверяем, чтобы ELO не уходил в минус
                if (currentElo >= 12) {
                    eloChange = -12;
                } else {
                    eloChange = -currentElo; // Отнимаем только до 0
                }
            }
            
            // Обновляем текущий ELO
            currentElo += eloChange;
            
            // Убеждаемся, что ELO не меньше 0
            if (currentElo < 0) {
                currentElo = 0;
            }
            
            // Сохраняем новое ELO в localStorage
            localStorage.setItem('playerElo', currentElo.toString());
            
            // Обновляем отображение ELO
            updateEloDisplay();
            
            console.log(`🏆 ИГРА ОКОНЧЕНА! Победитель: ${playerWon ? 'Игрок' : 'Бот'}. Финальный счет: ${finalScore}. ELO: ${currentElo} (${eloChange > 0 ? '+' : ''}${eloChange})`);
            
            // Показываем экран результатов через 1.5 секунды
            setTimeout(() => {
                showResultScreen(playerWon, eloChange);
            }, 1500);
        }
        
        // Функция показа экрана результатов
        function showResultScreen(playerWon, eloChange) {
            const gameContainer = document.getElementById('gameContainer');
            const resultScreen = document.getElementById('gameResultScreen');
            const resultCharacterImage = document.getElementById('resultCharacterImage');
            const resultStatus = document.getElementById('resultStatus');
            const resultSummary = document.getElementById('resultSummary');
            
            // Скрываем игровую арену
            gameContainer.style.display = 'none';
            
            // Устанавливаем изображение персонажа
            const selectedCharacter = localStorage.getItem('selectedCharacter') || 'malish';
            let characterImage = '';
            switch(selectedCharacter) {
                case 'malish':
                    characterImage = 'resources/malish2.png';
                    break;
                case 'genka':
                    characterImage = 'resources/genka2.png';
                    break;
                case 'drushok':
                    characterImage = 'resources/drushok2.png';
                    break;
                default:
                    characterImage = 'resources/malish2.png';
            }
            resultCharacterImage.src = characterImage;
            
            // Устанавливаем статус игры
            if (playerWon) {
                resultStatus.textContent = 'ПОБЕДА';
                resultSummary.textContent = `ПОБЕДА ${eloChange > 0 ? '+' : ''}${eloChange} ELO`;
                resultSummary.className = 'result-summary victory';
            } else {
                resultStatus.textContent = 'ПОРАЖЕНИЕ';
                resultSummary.textContent = `ПОРАЖЕНИЕ ${eloChange} ELO`;
                resultSummary.className = 'result-summary defeat';
            }
            
            // Показываем экран результатов
            resultScreen.style.display = 'flex';
            resultScreen.classList.add('fade-in');
            
            console.log('📊 Экран результатов показан');
        }
        
        // Функция обновления ELO в настройках
        function updateEloDisplay() {
            const eloElement = document.getElementById('currentElo');
            if (eloElement) {
                eloElement.textContent = currentElo;
                console.log('📊 ELO обновлен в настройках:', currentElo);
            }
        }
        
        // Функция перезапуска игры
        function restartGame() {
            playerScore = 0;
            botScore = 0;
            gameEnded = false;
            
            // Сбрасываем состояние мяча
            ballX = 50;
            ballY = 50;
            ballVelocityX = 0;
            ballVelocityY = 0;
            isMoving = false;
            isPlayerTouching = false;
            isBotTouching = false;
            
            // Обновляем позицию мяча
            const hockeyBall = document.querySelector('.hockey-ball');
            if (hockeyBall) {
                hockeyBall.style.left = ballX + '%';
                hockeyBall.style.top = ballY + '%';
                hockeyBall.classList.remove('moving', 'touching');
            }
            
            // Сбрасываем позиции персонажей в начальные места
            resetCharacterPositions();
            
            updateScore();
            // НЕ сбрасываем ELO - он уже обновлен в endGame()
            
            // Принудительно перезапускаем анимацию
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
            animateBall();
            
            console.log('🆕 Новая игра началась! Персонажи и мяч сброшены в начальные позиции.');
        }
        
        // Клик по мячу для начального толчка
        hockeyBall.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const randomAngle = Math.random() * Math.PI * 2;
            ballVelocityX = Math.cos(randomAngle) * (pushForce * 0.7);
            ballVelocityY = Math.sin(randomAngle) * (pushForce * 0.7);
            
            startBallMovement();
            console.log('🚀 Мяч запущен!');
        });
        
        // Touch события
        hockeyBall.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const randomAngle = Math.random() * Math.PI * 2;
            ballVelocityX = Math.cos(randomAngle) * (pushForce * 0.7);
            ballVelocityY = Math.sin(randomAngle) * (pushForce * 0.7);
            
            startBallMovement();
        });
        
        // Основная функция анимации с реалистичной физикой аэрохоккея
        function animateBall() {
            if (gameEnded) {
                console.log('⏹️ Анимация остановлена - игра окончена');
                return;
            }
            
            // Обновляем ИИ бота
            updateBotAI();
            
            // Проверяем столкновения и непрерывное касание
            checkCollisions();
            
            // Проверяем голы (но НЕ прерываем анимацию)
            checkGoals();
            
            // Применяем непрерывное толкание только для ИГРОКА (бот играет как человек - одиночными ударами)
            if (isPlayerTouching) {
                ballVelocityX += playerPushDirection.x * continuousPushForce * 0.15;
                ballVelocityY += playerPushDirection.y * continuousPushForce * 0.15;
                isMoving = true;
            }
            
            // БОТ НЕ ИСПОЛЬЗУЕТ непрерывное толкание - играет как человек одиночными ударами
            // if (isBotTouching) {
            //     ballVelocityX += botPushDirection.x * continuousPushForce * 0.15;
            //     ballVelocityY += botPushDirection.y * continuousPushForce * 0.15;
            //     isMoving = true;
            // }
            
            // Обновляем позицию с плавной физикой только если мяч движется
            if (isMoving || isPlayerTouching) { // Убрали isBotTouching - бот не "держит" мяч
                ballX += ballVelocityX * 0.12;
                ballY += ballVelocityY * 0.12;
            }
            
            // Границы арены с реалистичными отскоками
            const borderOffset = 8;
            
            if (ballX <= borderOffset || ballX >= (100 - borderOffset)) {
                ballVelocityX = -ballVelocityX * 0.98; // Высокое сохранение энергии
                ballX = Math.max(borderOffset, Math.min(100 - borderOffset, ballX));
                console.log('⚡ Отскок от вертикальной стенки');
            }
            
            if (ballY <= borderOffset || ballY >= (100 - borderOffset)) {
                ballVelocityY = -ballVelocityY * 0.98;
                ballY = Math.max(borderOffset, Math.min(100 - borderOffset, ballY));
                console.log('⚡ Отскок от горизонтальной стенки');
            }
            
            // Ограничиваем максимальную скорость
            const currentSpeed = Math.sqrt(ballVelocityX * ballVelocityX + ballVelocityY * ballVelocityY);
            if (currentSpeed > maxSpeed) {
                ballVelocityX = (ballVelocityX / currentSpeed) * maxSpeed;
                ballVelocityY = (ballVelocityY / currentSpeed) * maxSpeed;
            }
            
            // Применяем трение только если никто не касается мяча
            if (!isPlayerTouching && !isBotTouching) {
                ballVelocityX *= friction;
                ballVelocityY *= friction;
            }
            
            // Применяем визуальные эффекты
            if (isPlayerTouching) { // Только игрок может "держать" мяч
                hockeyBall.classList.add('touching');
                hockeyBall.classList.add('moving');
            } else {
                hockeyBall.classList.remove('touching');
                if (currentSpeed < minVelocity) {
                    hockeyBall.classList.remove('moving');
                }
            }
            
            // Проверяем остановку (бот не влияет на остановку)
            if (currentSpeed < minVelocity && !isPlayerTouching) {
                ballVelocityX = 0;
                ballVelocityY = 0;
                isMoving = false;
            }
            
            // Обновляем позицию мяча
            hockeyBall.style.left = ballX + '%';
            hockeyBall.style.top = ballY + '%';
            
            // ВСЕГДА продолжаем анимацию для проверки касаний
            animationId = requestAnimationFrame(animateBall);
        }
        
        // Реалистичная функция проверки столкновений для аэрохоккея
        function checkCollisions() {
            const currentTime = Date.now();
            
            const arena = document.querySelector('.hockey-arena');
            const arenaRect = arena.getBoundingClientRect();
            
            // Конвертируем позицию мяча из процентов в пиксели
            const ballPixelX = (ballX / 100) * arenaRect.width;
            const ballPixelY = (ballY / 100) * arenaRect.height;
            const ballRadius = 27.5; // Половина от 55px
            
            // Сбрасываем состояние касания
            let wasPlayerTouching = isPlayerTouching;
            let wasBotTouching = isBotTouching;
            isPlayerTouching = false;
            isBotTouching = false;
            
            // Проверка столкновения с игроком
            const playerCharacter = document.getElementById('selectedCharacter');
            if (playerCharacter) {
                const playerRect = playerCharacter.getBoundingClientRect();
                const playerPixelX = playerRect.left - arenaRect.left + playerRect.width / 2;
                const playerPixelY = playerRect.top - arenaRect.top + playerRect.height / 2;
                const playerRadius = playerRect.width / 2;
                
                const distance = Math.sqrt(
                    Math.pow(ballPixelX - playerPixelX, 2) + 
                    Math.pow(ballPixelY - playerPixelY, 2)
                );
                
                const touchDistance = ballRadius + playerRadius + 5; // Увеличенная зона касания
                
                if (distance < touchDistance && distance > 0) {
                    isPlayerTouching = true;
                    console.log(`👆 Игрок касается мяча! Дистанция: ${distance.toFixed(1)}, Зона касания: ${touchDistance.toFixed(1)}`);
                    
                    // Вычисляем направление толкания
                    const deltaX = ballPixelX - playerPixelX;
                    const deltaY = ballPixelY - playerPixelY;
                    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                    
                    if (length > 0) {
                        playerPushDirection.x = deltaX / length;
                        playerPushDirection.y = deltaY / length;
                        
                        // Если только начали касаться - даем начальный импульс
                        if (!wasPlayerTouching && currentTime - lastCollisionTime > collisionCooldown) {
                            const currentSpeed = Math.sqrt(ballVelocityX * ballVelocityX + ballVelocityY * ballVelocityY);
                            const baseForce = Math.max(pushForce, currentSpeed * 1.2);
                            
                            // Небольшая случайность для реализма
                            const randomFactor = 0.05;
                            const randomX = (Math.random() - 0.5) * randomFactor;
                            const randomY = (Math.random() - 0.5) * randomFactor;
                            
                            ballVelocityX += (playerPushDirection.x + randomX) * baseForce * 0.5;
                            ballVelocityY += (playerPushDirection.y + randomY) * baseForce * 0.5;
                            
                            isMoving = true;
                            lastCollisionTime = currentTime;
                            console.log(`🎯 Игрок начал толкать мяч! Дистанция: ${distance.toFixed(1)}, Скорость: ${Math.sqrt(ballVelocityX * ballVelocityX + ballVelocityY * ballVelocityY).toFixed(2)}`);
                            if (navigator.vibrate) navigator.vibrate(40);
                        }
                        
                        // Отталкиваем мяч если он слишком близко
                        const minDistance = ballRadius + playerRadius - 3;
                        if (distance < minDistance) {
                            const pushDistance = minDistance + 2;
                            const newBallPixelX = playerPixelX + playerPushDirection.x * pushDistance;
                            const newBallPixelY = playerPixelY + playerPushDirection.y * pushDistance;
                            
                            ballX = (newBallPixelX / arenaRect.width) * 100;
                            ballY = (newBallPixelY / arenaRect.height) * 100;
                            
                            // Ограничиваем позицию мяча границами арены
                            const borderOffset = 8;
                            ballX = Math.max(borderOffset, Math.min(100 - borderOffset, ballX));
                            ballY = Math.max(borderOffset, Math.min(100 - borderOffset, ballY));
                        }
                    }
                }
            }
            
            // Проверка столкновения с ботом (аналогично)
            const botCharacter = document.getElementById('botCharacter');
            if (botCharacter) {
                const botRect = botCharacter.getBoundingClientRect();
                const botPixelX = botRect.left - arenaRect.left + botRect.width / 2;
                const botPixelY = botRect.top - arenaRect.top + botRect.height / 2;
                const botRadius = botRect.width / 2;
                
                const distance = Math.sqrt(
                    Math.pow(ballPixelX - botPixelX, 2) + 
                    Math.pow(ballPixelY - botPixelY, 2)
                );
                
                const touchDistance = ballRadius + botRadius + 5;
                
                if (distance < touchDistance && distance > 0) {
                    isBotTouching = true;
                    
                    const deltaX = ballPixelX - botPixelX;
                    const deltaY = ballPixelY - botPixelY;
                    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                    
                    if (length > 0) {
                        botPushDirection.x = deltaX / length;
                        botPushDirection.y = deltaY / length;
                        
                        // Если только начали касаться - даем СИЛЬНЫЙ импульс как у реального игрока
                        if (!wasBotTouching && currentTime - lastCollisionTime > collisionCooldown) {
                            const currentSpeed = Math.sqrt(ballVelocityX * ballVelocityX + ballVelocityY * ballVelocityY);
                            
                            // РЕАЛИСТИЧНАЯ игра - бот бьет как человек
                            let smartPushX = botPushDirection.x;
                            let smartPushY = botPushDirection.y;
                            
                            // Если мяч близко к воротам бота (ballX > 80), СИЛЬНО отбиваем ВЛЕВО
                            if (ballX > 80) {
                                // МОЩНОЕ отбивание влево (к воротам игрока)
                                smartPushX = -Math.abs(smartPushX) * 2.5; // Еще сильнее влево!
                                
                                // Отбиваем к центру поля по Y
                                if (ballY < 40) {
                                    smartPushY = Math.abs(smartPushY) * 1.8; // Сильнее к центру снизу
                                } else if (ballY > 60) {
                                    smartPushY = -Math.abs(smartPushY) * 1.8; // Сильнее к центру сверху
                                } else {
                                    smartPushY = smartPushY * 0.5; // Умеренно по Y если в центре
                                }
                                
                                console.log('� БОТ МОЩНО ОТБИВАЕТ мяч от ворот!');
                            } else {
                                // Обычная игра - бот играет естественно
                                smartPushX = smartPushX * 1.7; // Увеличили силу удара
                                smartPushY = smartPushY * 1.7;
                            }
                            
                            // Иногда бот делает ошибки (10% шанс), чтобы можно было забить
                            const botMistakeChance = 0.10; // 10% шанс ошибки (было 15%)
                            if (Math.random() < botMistakeChance) {
                                // Бот делает ошибку - промахивается или бьет слабо
                                smartPushX *= 0.3; // Очень слабый удар
                                smartPushY *= 0.3;
                                console.log('😅 Бот промахнулся или ударил слабо!');
                            }
                            
                            // СИЛЬНАЯ базовая сила как у человека - УВЕЛИЧИВАЕМ СИЛУ!
                            const humanLikeForce = Math.max(pushForce * 1.8, currentSpeed * 2.0); // Увеличили силу!
                            
                            // Минимальная случайность для точности
                            const randomFactor = 0.02;
                            const randomX = (Math.random() - 0.5) * randomFactor;
                            const randomY = (Math.random() - 0.5) * randomFactor;
                            
                            // ОЧЕНЬ МОЩНЫЙ удар как у человека - ОТКИДЫВАЕМ МЯЧА ДАЛЕКО!
                            ballVelocityX += (smartPushX + randomX) * humanLikeForce * 1.0; // Увеличили коэффициент!
                            ballVelocityY += (smartPushY + randomY) * humanLikeForce * 1.0;
                            
                            isMoving = true;
                            lastCollisionTime = currentTime;
                            console.log(`💥 Бот УДАРИЛ мяч как человек! Дистанция: ${distance.toFixed(1)}, Скорость: ${Math.sqrt(ballVelocityX * ballVelocityX + ballVelocityY * ballVelocityY).toFixed(2)}`);
                            if (navigator.vibrate) navigator.vibrate(50); // Сильнее вибрация
                        }
                        
                        // Отталкиваем мяч если он слишком близко
                        const minDistance = ballRadius + botRadius - 3;
                        if (distance < minDistance) {
                            const pushDistance = minDistance + 2;
                            const newBallPixelX = botPixelX + botPushDirection.x * pushDistance;
                            const newBallPixelY = botPixelY + botPushDirection.y * pushDistance;
                            
                            ballX = (newBallPixelX / arenaRect.width) * 100;
                            ballY = (newBallPixelY / arenaRect.height) * 100;
                            
                            // Ограничиваем позицию мяча границами арены
                            const borderOffset = 8;
                            ballX = Math.max(borderOffset, Math.min(100 - borderOffset, ballX));
                            ballY = Math.max(borderOffset, Math.min(100 - borderOffset, ballY));
                        }
                    }
                }
            }
            
            // Логирование состояния касания
            if (isPlayerTouching && !wasPlayerTouching) {
                console.log('🟢 Игрок начал касаться мяча');
            } else if (!isPlayerTouching && wasPlayerTouching) {
                console.log('🔴 Игрок перестал касаться мяча');
            }
            
            if (isBotTouching && !wasBotTouching) {
                console.log('🟢 Бот начал касаться мяча');
            } else if (!isBotTouching && wasBotTouching) {
                console.log('🔴 Бот перестал касаться мяча');
            }
        }
        
        // Инициализация с постоянной проверкой касаний
        ballX = 50;
        ballY = 50;
        hockeyBall.style.left = ballX + '%';
        hockeyBall.style.top = ballY + '%';
        
        // Инициализируем счет и ELO
        updateScore();
        updateEloDisplay();
        
        // Запускаем постоянную анимацию для проверки касаний
        animateBall();
        
        console.log('⚡ Аэрохоккей готов! Перетащите персонажа к мячу для игры. Игра до 3 голов!');
    }
    
    // Добавляем интерактивность к зонам
    interactiveZones.forEach(zone => {
        zone.addEventListener('click', function() {
            const zoneName = this.dataset.zone;
            console.log(`Клик по зоне: ${zoneName}`);
            
            // Анимация при клике
            this.style.transform += ' scale(1.2)';
            this.style.transition = 'transform 0.2s ease';
            
            setTimeout(() => {
                this.style.transform = this.style.transform.replace(' scale(1.2)', '');
            }, 300);
        });
    });
}
// Функция для создания перетаскиваемого персонажа
function makeDraggable(element) {
    let isDragging = false;
    let startX, startY, initialX, initialY;
    
    // Получаем контейнер арены для ограничений
    const arena = document.querySelector('.hockey-arena');
    
    // Mouse события
    element.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    
    // Touch события для мобильных
    element.addEventListener('touchstart', dragStart, { passive: false });
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('touchend', dragEnd);
    
    function dragStart(e) {
        e.preventDefault();
        isDragging = true;
        element.classList.add('dragging');
        
        const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        const clientY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
        
        startX = clientX;
        startY = clientY;
        
        const rect = element.getBoundingClientRect();
        initialX = rect.left + rect.width / 2;
        initialY = rect.top + rect.height / 2;
        
        console.log('Начало перетаскивания персонажа');
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        
        const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
        
        const deltaX = clientX - startX;
        const deltaY = clientY - startY;
        
        // Получаем границы арены (изображения)
        const arenaImage = arena.querySelector('.arena-image');
        const arenaImageRect = arenaImage.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        
        // Вычисляем новую позицию
        const newX = initialX + deltaX;
        const newY = initialY + deltaY;
        
        // Отступы от краев для учета синих границ арены (адаптивные)
        const arenaWidth = arenaImageRect.width;
        let borderOffset;
        
        // Адаптивные отступы в зависимости от размера арены
        if (arenaWidth > 800) {
            borderOffset = 30; // Большие экраны
        } else if (arenaWidth > 600) {
            borderOffset = 25; // Средние экраны
        } else if (arenaWidth > 400) {
            borderOffset = 20; // Планшеты
        } else {
            borderOffset = 15; // Мобильные
        }
        
        // Вычисляем ограничения относительно изображения арены с учетом бортиков
        const minX = arenaImageRect.left + borderOffset + elementRect.width / 2;
        const maxX = arenaImageRect.right - borderOffset - elementRect.width / 2;
        const minY = arenaImageRect.top + borderOffset + elementRect.height / 2;
        const maxY = arenaImageRect.bottom - borderOffset - elementRect.height / 2;
        
        // Ограничиваем позицию
        const constrainedX = Math.max(minX, Math.min(maxX, newX));
        const constrainedY = Math.max(minY, Math.min(maxY, newY));
        
        // Конвертируем в проценты относительно контейнера арены
        const arenaRect = arena.getBoundingClientRect();
        const percentX = ((constrainedX - arenaRect.left) / arenaRect.width) * 100;
        const percentY = ((constrainedY - arenaRect.top) / arenaRect.height) * 100;
        
        // Применяем позицию
        element.style.left = percentX + '%';
        element.style.top = percentY + '%';
    }
    
    function dragEnd(e) {
        if (!isDragging) return;
        
        isDragging = false;
        element.classList.remove('dragging');
        
        console.log('Персонаж перемещен в новую позицию');
    }
}

// Функции для приветственного окна
function showWelcomeModal() {
    const welcomeModal = document.getElementById('welcomeModal');
    const welcomeCloseBtn = document.getElementById('welcomeCloseBtn');
    
    if (welcomeModal) {
        // Показываем модальное окно
        welcomeModal.style.display = 'flex';
        
        // Добавляем класс для плавного появления
        setTimeout(() => {
            welcomeModal.classList.add('show');
        }, 50);
        
        // Обработчик кнопки закрытия
        if (welcomeCloseBtn) {
            welcomeCloseBtn.addEventListener('click', function() {
                hideWelcomeModal();
            });
        }
        
        // Закрытие по клику на фон
        welcomeModal.addEventListener('click', function(e) {
            if (e.target === welcomeModal) {
                hideWelcomeModal();
            }
        });
        
        // Закрытие по Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && welcomeModal.classList.contains('show')) {
                hideWelcomeModal();
            }
        });
        
        console.log('🎉 Приветственное окно показано');
    }
}

function hideWelcomeModal() {
    const welcomeModal = document.getElementById('welcomeModal');
    
    if (welcomeModal && welcomeModal.classList.contains('show')) {
        // Добавляем класс для плавного исчезновения
        welcomeModal.classList.remove('show');
        welcomeModal.classList.add('hide');
        
        // Полностью скрываем после анимации
        setTimeout(() => {
            welcomeModal.style.display = 'none';
            welcomeModal.classList.remove('hide');
            console.log('👋 Приветственное окно скрыто');
        }, 500); // Время анимации
    }
}
