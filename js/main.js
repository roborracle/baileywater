document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  const header = document.querySelector('.site-header');

  /* Mobile navigation toggle */
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      }
    });
  }

  /* Scroll reveal animations */
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
    revealObserver.observe(el);
  });

  /* Header scroll state */
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* Tabbed navigation */
  const tabContainer = document.querySelector('.bwi-tabs');
  if (tabContainer) {
    const tabs = Array.from(tabContainer.querySelectorAll('.bwi-tabs__tab'));
    const panels = Array.from(tabContainer.querySelectorAll('.bwi-tabs__panel'));
    const accordionTriggers = Array.from(tabContainer.querySelectorAll('.bwi-tabs__accordion-trigger'));
    function activateTab(index) {
      tabs.forEach((tab, i) => {
        const isActive = i === index;
        tab.setAttribute('aria-selected', String(isActive));
        tab.setAttribute('tabindex', isActive ? '0' : '-1');
      });
      panels.forEach((panel, i) => {
        const isActive = i === index;
        panel.classList.toggle('is-active', isActive);
        panel.setAttribute('aria-hidden', String(!isActive));
      });
      accordionTriggers.forEach((trigger, i) => {
        trigger.setAttribute('aria-expanded', String(i === index));
      });
    }

    function toggleAccordion(index) {
      const panel = panels[index];
      const isOpen = panel.classList.contains('is-active');
      panels.forEach((p, i) => {
        p.classList.remove('is-active');
        p.setAttribute('aria-hidden', 'true');
        accordionTriggers[i].setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        panel.classList.add('is-active');
        panel.setAttribute('aria-hidden', 'false');
        accordionTriggers[index].setAttribute('aria-expanded', 'true');
      }
      tabs.forEach((tab, i) => {
        const isActive = !isOpen && i === index;
        tab.setAttribute('aria-selected', String(isActive));
        tab.setAttribute('tabindex', isActive ? '0' : '-1');
      });
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => activateTab(i));
      tab.addEventListener('keydown', (e) => {
        let target = i;
        if (e.key === 'ArrowRight') target = (i + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') target = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') target = 0;
        else if (e.key === 'End') target = tabs.length - 1;
        else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateTab(i);
          return;
        }
        else return;
        e.preventDefault();
        tabs[target].focus();
      });
    });

    accordionTriggers.forEach((trigger, i) => {
      trigger.addEventListener('click', () => toggleAccordion(i));
    });

    activateTab(0);
  }
});
