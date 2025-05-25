document.addEventListener('DOMContentLoaded', function() {
    // Referências aos elementos
    const pauseBtn = document.getElementById('pause-btn');
    const speedUpBtn = document.getElementById('speed-up');
    const speedDownBtn = document.getElementById('speed-down');
    const speedValue = document.getElementById('speed-value');
    const planetInfo = document.getElementById('planet-info');
    
    // Estado da animação
    let isPaused = false;
    let speedMultiplier = 1;
    let originalAnimationDurations = {};
    
    // Informações dos planetas
    const planetData = {
        'mercury': {
            name: 'Mercúrio',
            description: 'O menor planeta do Sistema Solar e o mais próximo do Sol. Tem uma superfície rochosa coberta de crateras, semelhante à Lua.',
            distance: '57,9 milhões km do Sol',
            orbitalPeriod: '88 dias terrestres',
            diameter: '4.879 km'
        },
        'venus': {
            name: 'Vênus',
            description: 'Conhecido como o "gêmeo" da Terra devido ao seu tamanho e massa semelhantes. Tem uma atmosfera densa e é o planeta mais quente do Sistema Solar.',
            distance: '108,2 milhões km do Sol',
            orbitalPeriod: '225 dias terrestres',
            diameter: '12.104 km'
        },
        'earth': {
            name: 'Terra',
            description: 'Nosso planeta natal, o único conhecido por abrigar vida. Tem uma atmosfera rica em oxigênio e grandes quantidades de água líquida.',
            distance: '149,6 milhões km do Sol',
            orbitalPeriod: '365,25 dias',
            diameter: '12.742 km'
        },
        'mars': {
            name: 'Marte',
            description: 'Conhecido como o "Planeta Vermelho" devido à sua aparência avermelhada. Tem calotas polares, vulcões extintos e evidências de água no passado.',
            distance: '227,9 milhões km do Sol',
            orbitalPeriod: '687 dias terrestres',
            diameter: '6.779 km'
        },
        'jupiter': {
            name: 'Júpiter',
            description: 'O maior planeta do Sistema Solar. É um gigante gasoso com uma Grande Mancha Vermelha, uma tempestade que dura há séculos.',
            distance: '778,5 milhões km do Sol',
            orbitalPeriod: '11,86 anos terrestres',
            diameter: '139.820 km'
        },
        'saturn': {
            name: 'Saturno',
            description: 'Famoso por seus anéis impressionantes, compostos principalmente de partículas de gelo. É o segundo maior planeta do Sistema Solar.',
            distance: '1,4 bilhão km do Sol',
            orbitalPeriod: '29,46 anos terrestres',
            diameter: '116.460 km'
        },
        'uranus': {
            name: 'Urano',
            description: 'Um gigante de gelo com uma inclinação axial única, fazendo-o "rolar" em sua órbita. Tem uma coloração azul-esverdeada devido ao metano em sua atmosfera.',
            distance: '2,9 bilhões km do Sol',
            orbitalPeriod: '84,01 anos terrestres',
            diameter: '50.724 km'
        },
        'neptune': {
            name: 'Netuno',
            description: 'O planeta mais distante do Sol (desde a reclassificação de Plutão). É um gigante de gelo com ventos extremamente fortes.',
            distance: '4,5 bilhões km do Sol',
            orbitalPeriod: '164,8 anos terrestres',
            diameter: '49.244 km'
        }
    };
    
    // Armazenar as durações originais de animação
    function storeOriginalDurations() {
        const planets = document.querySelectorAll('.planet');
        const orbits = document.querySelectorAll('.orbit');
        
        planets.forEach(planet => {
            const planetClass = Array.from(planet.classList).find(cls => cls !== 'planet');
            originalAnimationDurations[planetClass] = {
                planet: getComputedStyle(planet).animationDuration,
                orbit: getComputedStyle(planet.parentElement).animationDuration
            };
        });
    }
    
    // Atualizar velocidade de animação
    function updateAnimationSpeed() {
        const planets = document.querySelectorAll('.planet');
        const orbits = document.querySelectorAll('.orbit');
        
        planets.forEach(planet => {
            const planetClass = Array.from(planet.classList).find(cls => cls !== 'planet');
            if (originalAnimationDurations[planetClass]) {
                const originalDuration = parseFloat(originalAnimationDurations[planetClass].planet);
                planet.style.animationDuration = `${originalDuration / speedMultiplier}s`;
            }
        });
        
        orbits.forEach(orbit => {
            const orbitClass = Array.from(orbit.classList).find(cls => cls.includes('-orbit'));
            const planetClass = orbitClass ? orbitClass.replace('-orbit', '') : null;
            
            if (planetClass && originalAnimationDurations[planetClass]) {
                const originalDuration = parseFloat(originalAnimationDurations[planetClass].orbit);
                orbit.style.animationDuration = `${originalDuration / speedMultiplier}s`;
            }
        });
        
        speedValue.textContent = `${speedMultiplier}x`;
    }
    
    // Pausar/Retomar animação
    function togglePause() {
        const planets = document.querySelectorAll('.planet');
        const orbits = document.querySelectorAll('.orbit');
        
        isPaused = !isPaused;
        
        const animationState = isPaused ? 'paused' : 'running';
        planets.forEach(planet => {
            planet.style.animationPlayState = animationState;
        });
        
        orbits.forEach(orbit => {
            orbit.style.animationPlayState = animationState;
        });
        
        pauseBtn.textContent = isPaused ? 'Retomar' : 'Pausar';
    }
    
    // Adicionar event listeners
    pauseBtn.addEventListener('click', togglePause);
    
    speedUpBtn.addEventListener('click', function() {
        if (speedMultiplier < 10) {
            speedMultiplier *= 2;
            updateAnimationSpeed();
        }
    });
    
    speedDownBtn.addEventListener('click', function() {
        if (speedMultiplier > 0.25) {
            speedMultiplier /= 2;
            updateAnimationSpeed();
        }
    });
    
    // Adicionar interatividade aos planetas
    const planets = document.querySelectorAll('.planet');
    planets.forEach(planet => {
        planet.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const planetClass = Array.from(this.classList).find(cls => cls !== 'planet');
            if (planetData[planetClass]) {
                const data = planetData[planetClass];
                planetInfo.innerHTML = `
                    <h3>${data.name}</h3>
                    <p>${data.description}</p>
                    <p><strong>Distância do Sol:</strong> ${data.distance}</p>
                    <p><strong>Período Orbital:</strong> ${data.orbitalPeriod}</p>
                    <p><strong>Diâmetro:</strong> ${data.diameter}</p>
                `;
            }
        });
    });
    
    // Adicionar interatividade ao Sol
    const sun = document.querySelector('.sun');
    sun.addEventListener('click', function() {
        planetInfo.innerHTML = `
            <h3>Sol</h3>
            <p>O Sol é a estrela no centro do Sistema Solar. É uma esfera quase perfeita de plasma quente, com atividade magnética interna que gera um campo magnético solar.</p>
            <p><strong>Tipo:</strong> Estrela anã amarela</p>
            <p><strong>Diâmetro:</strong> 1.392.700 km (109x o da Terra)</p>
            <p><strong>Temperatura superficial:</strong> 5.500°C</p>
            <p><strong>Idade estimada:</strong> 4,6 bilhões de anos</p>
        `;
    });
    
    // Inicializar
    storeOriginalDurations();
    
    // Adicionar efeito de hover nos planetas
    planets.forEach(planet => {
        planet.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-50%) scale(1.5)';
            this.style.zIndex = '100';
            this.style.boxShadow = '0 0 10px white';
        });
        
        planet.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(-50%)';
            this.style.zIndex = '';
            this.style.boxShadow = '';
        });
    });
    
    // Adicionar efeito de hover no Sol
    sun.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 0 60px #ff8c00, 0 0 120px #ff8c00';
    });
    
    sun.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '0 0 50px #ff8c00, 0 0 100px #ff8c00';
    });
});
