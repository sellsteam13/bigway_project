document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > 1200)
    {
        scrollInit();
    }
});

const scrollInit = () => {
    const controller = new ScrollMagic.Controller();
    const blockHeight = document.querySelector('.advantages').clientHeight - 300;
    console.log(blockHeight)
    new ScrollMagic.Scene({
        duration: blockHeight,
        triggerElement: '.advantages',
        triggerHook: 0,
    })
    .setPin('.advantages-titling')
    .addTo(controller);

    // gsap anim
    const tl = new TimelineMax(
        {
            onUpdate: updatePercentage,
        }
    );

    const tm = new TimelineMax(
        {
            onUpdate: updatePercentage,
        }
    );

    const tk = new TimelineMax(
        {
            onUpdate: updatePercentage,
        }
    );

    const te = new TimelineMax(
        {
            onUpdate: updatePercentage,
        }
    );

    const tg = new TimelineMax(
        {
            onUpdate: updatePercentage,
        }
    );

    tl.from('#principes', 0.5, {y: 100});
    tm.fromTo('#homeTitle', 0.5, {y: 0}, {y: -100});
    tk.fromTo('#homeBtn', 0.5, {y: 0}, {y: -100});
    te.fromTo('.footer-main', 0.5, {y: 300}, {y: 0});
    tg.fromTo('#principesTitle', 0.5, {y: 0, opacity: 1}, {y: -100, opacity: 0});

    const scene = new ScrollMagic.Scene({
        triggerElement: '#principes',
        triggerHook: 'onEnter',
        duration: 600,
    })
    .setTween(tl)
    .addTo(controller);

    const sceneHome = new ScrollMagic.Scene({
        triggerElement: '.home',
        triggerHook: 0,
        duration: 500,
    })
    .setTween(tm)
    .addTo(controller);

    const sceneHomeBtn = new ScrollMagic.Scene({
        triggerElement: '.home',
        triggerHook: 0,
        duration: 500,
    })
    .setTween(tk)
    .addTo(controller);

    const sceneFooter = new ScrollMagic.Scene({
        triggerElement: '.footer',
        triggerHook: 'onEnter',
        duration: '10%',
    })
    .setTween(te)
    .addTo(controller);

    const scenePrincipesTitle = new ScrollMagic.Scene({
        triggerElement: '.principes-photo',
        triggerHook: 'onEnter',
        duration: 500,
    })
    .setTween(tg)
    .addTo(controller);

    function updatePercentage() {
        tl.progress();
    }

    var tv = new TimelineMax();

    if (document.querySelector('.portfolio-list'))
    {
        var elementWidth = document.querySelector('.portfolio-list__item').offsetWidth * document.querySelectorAll('.portfolio-list__item').length;

        var width = window.innerWidth - elementWidth;

        var duration = elementWidth / window.innerHeight * 100;

        var official = duration + '%';

        tv
        .to('.portfolio-list', 5, {x: width, ease: Power0.easeNone});

        var scene1 = new ScrollMagic.Scene({
            triggerElement: '.portfolio-list',
            triggerHook: 0,
            duration: official
        })
        .setPin('.portfolio-list')
        .setTween(tv)
        .addTo(controller);

        console.log(elementWidth);
    }
};