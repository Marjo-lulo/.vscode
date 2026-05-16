const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    }) 
}, {
    threshold: 0.15
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

const categories = document.querySelectorAll('.category');
categories.forEach((category) => {
    category.addEventListener('click', () => {
        categories.forEach(c => c.classList.remove('active'))
        category.classList.add('active');
    })
})

window.addEventListener('scroll', () =>{
    const header = document.querySelector('header');

    if(window.scrollY > 50) {
        header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
    }else {
        header.style.boxShadow = 'none';
    }
})

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 12;
        const rotateX = ((y / rect.height) - 0.5) * -12;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`
    })

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`
    })
})