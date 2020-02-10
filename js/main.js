var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};
TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};

var goHere = function() {
  $(".mouse-icon").on("click", function(event) {
    event.preventDefault();
    $("html,body").animate(
      { scrollTop: $(".goto-here").offset().top },
      500,
      "easeInOutExpo"
    );
    return false;
  });
};
goHere();

$(function($) {
  var sections = [];
  var id = false;
  var $navbara = $("#navi a");

  $navbara.click(function(e) {
    e.preventDefault();
    $("html, body").animate(
      { scrollTop: $($(this).attr("href")).offset().top - 180 },
      500
    );

    hash($(this).attr("href"));
  });
  $navbara.each(function() {
    sections.push($($(this).attr("href")));
  });
  $(window).scroll(function(e) {
    var scrollTop = $(this).scrollTop() + $(window).height() / 2;
    for (var i in sections) {
      var section = sections[i];
      if (scrollTop > section.offset().top) {
        var scrolled_id = section.attr("id");
      }
    }
    if (scrolled_id !== id) {
      id = scrolled_id;
      $($navbara).removeClass("current");
      $('#navi a[href="#' + id + '"]').addClass("current");
    }
  });
});

function esToen() {
  $esta = document.getElementsByClassName("mostrar");
  $oculto = document.getElementsByClassName("hidden");
  $($esta).animate(
    {
      left: 0,
      opacity: 0
    },
    3000,
    function() {
      // Animation complete.
      // $($esta).removeClass("mostrar");
      // $($oculto).addClass("mostrar");
      $("#esp").toggleClass("hidden");
      $("#en").toggleClass("hidden");
      $("#esp").toggleClass("mostrar");
      $("#en").toggleClass("mostrar");
    }
  );
}
setInterval(esToen, 10000);
