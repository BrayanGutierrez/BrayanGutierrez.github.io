$(document).ready(function(){
	$(".ok").hide()

	$("#sobreMi").find(".in").hide().animate({
 		'margin-left':'-100px'
 	})

	$("#skills").find(".in").hide()

	const form_selector = "#contact-form"
	let sticky = false
	let i = 0
	let j = 0

	checkScroll()
	$(window).scroll(checkScroll)

	function checkScroll(){

		const position_div_sobreMi = $("#sobreMi").position()
		const position_div_skills = $("#skills").position()

		if ($(window).scrollTop() > ((position_div_sobreMi.top)-200)){
			while (i < 1){
				$("#sobreMi").find(".in").fadeIn().animate({
	     		'margin-left':'0px'
	     	})
				i++
			}
		}

		if ($(window).scrollTop() > ((position_div_skills.top)-200)){
			while (j < 1){
				$("#skills").find(".in").fadeIn()
				j++
			}
		}
		
		const inBottom = isInBottom()

		if(inBottom && !sticky){
			sticky = true
			stickNavigation()
		}

		if(!inBottom && sticky){
			sticky = false
			unStickNavigation()
		}
	}

	function isInBottom(){
		const $main = $("#main")
		const mainHeight = $main.height()
		return $(window).scrollTop() >= mainHeight
	}

	function stickNavigation(){
		$("#navigation, #responsive-nav").addClass("black1").removeClass("no-background no-shadow")
		$("#myName, #myNameSide").removeClass("my-name")
	}

	function unStickNavigation(){
		$("#navigation, #responsive-nav").removeClass("black1").addClass("no-background no-shadow")
		$("#myName, #myNameSide").addClass("my-name")
	}

	$("#menu-opener").on("click",toggleNav)
	$(".menu-link").on("click",toggleNav)

	function toggleNav(){
		$("#responsive-nav").addClass("black1").removeClass("no-background no-shadow")
		$("#responsive-nav ul").toggleClass("active")
		$("#menu-opener").toggleClass("fa-bars")
	}

	$(".menu-link").click(function(ev){
		ev.preventDefault()
		const section = $(this).attr("href")
		$('html, body').animate({
      scrollTop: $(section).offset().top
  	})
	})

	$("#send-btn").on("click", (ev)=>{
		ev.preventDefault()
		if(valid_form()){
			$(".form-error").html("")
			send_form()
		}else{
			$(".form-error").html("Debes llenar correctamente todos los campos.")
			$('html, body').animate({
	      scrollTop: $('#contacto').offset().top
	  	})
		}
	})

	function valid_form(){
		return document.querySelector(form_selector).checkValidity()
	}

	function send_form(){
		const $form = $(form_selector)
		const $client_name = $('#name').val()
		$.ajax({
	    url: $form.attr("action"), 
	    method: "POST",
	    data: $form.formObject(),
	    dataType: "json",
	    success: function(){
	     	$form.slideUp()
	     	$('html, body').animate({
		      scrollTop: $('#contacto').offset().top
		  	}, 1000)
	     	$("#info-contacto").html("Hola " + $client_name + ", se ha enviado tu mensaje, pronto me pondré en contacto contigo.")
	     	$(".ok").show().animate({
	     		'margin-top':'50px'
	     	},500)
	    }
		})
	}
});