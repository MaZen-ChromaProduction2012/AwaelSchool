(function(){
  var yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- theme toggle ----------
  var themeBtn = document.getElementById('theme-toggle');
  if(themeBtn){
    themeBtn.addEventListener('click', function(){
      var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try{ localStorage.setItem('site-theme', next); }catch(e){}
    });
  }

  // ---------- language toggle ----------
  var langBtn = document.getElementById('lang-toggle');
  function applyLang(lang){
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('.t').forEach(function(el){
      var val = el.getAttribute('data-' + lang);
      if(val !== null) el.textContent = val;
    });
    document.querySelectorAll('[data-ph-ar]').forEach(function(el){
      var val = el.getAttribute('data-ph-' + lang);
      if(val !== null) el.setAttribute('placeholder', val);
    });
    if(langBtn){
      langBtn.textContent = lang === 'ar' ? 'EN' : 'AR';
    }
    document.body.setAttribute('data-lang', lang);
  }
  var savedLang = 'ar';
  try{ savedLang = localStorage.getItem('site-lang') || 'ar'; }catch(e){}
  applyLang(savedLang);
  if(langBtn){
    langBtn.addEventListener('click', function(){
      var current = document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'ar';
      var next = current === 'ar' ? 'en' : 'ar';
      applyLang(next);
      try{ localStorage.setItem('site-lang', next); }catch(e){}
    });
  }

  // ---------- mobile nav ----------
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('navLinks');
  if(toggle && links){
    toggle.addEventListener('click', function(){
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ links.classList.remove('open'); });
    });
  }

  // ---------- smooth-scroll offset for in-page anchors ----------
  var navbarEl = document.getElementById('navbar');
  var navHeight = navbarEl ? navbarEl.offsetHeight : 0;
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href').slice(1);
      if(!id) return;
      var target = document.getElementById(id);
      if(!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - (navHeight - 1);
      window.scrollTo({top: top, behavior: 'smooth'});
    });
  });

  // ---------- reveal on scroll ----------
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.15, rootMargin:'0px 0px -60px 0px'});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in-view'); });
  }
})();
