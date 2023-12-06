// Document is ready
$(document).ready(function () {

    console.log("Script Loaded Successfully.");

	// Validate Username
	$("#usercheck").hide();
	let usernameError = true;
	$("#usernames").keyup(function () {
		validateUsername();
	});

	function validateUsername() {
		let usernameValue = $("#usernames").val();
		if (usernameValue.length == "") {
			$("#usercheck").show();
			usernameError = false;
			return false;
		} else if (usernameValue.length < 3 || usernameValue.length > 10) {
			$("#usercheck").show();
			$("#usercheck").html("**length of username must be between 3 and 10");
			usernameError = false;
			return false;
		} else {
			$("#usercheck").hide();
		}
	}

	// Validate Email
	const email = document.getElementById("email");
	email.addEventListener("blur", () => {
		let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		let emailValue = email.value;

		if (regex.test(emailValue)) {
			email.classList.remove("is-invalid");
			emailError = true;
			document.getElementById("emailvalid").style.display = "none";
		} else {
			email.classList.add("is-invalid");
			emailError = false;
			document.getElementById("emailvalid").style.display = "block";
		}
	});

	// Validate Password
	$("#passcheck").hide();
	let passwordError = true;
	$("#password").keyup(function () {
		validatePassword();
	});
	function validatePassword() {
		let passwordValue = $("#password").val();
		if (passwordValue.length == "") {
			$("#passcheck").show();
			passwordError = false;
			return false;
		}
		if (passwordValue.length < 3 || passwordValue.length > 10) {
			$("#passcheck").show();
			$("#passcheck").html(
				"**length of your password must be between 3 and 10"
			);
			$("#passcheck").css("color", "red");
			passwordError = false;
			return false;
		} else {
			$("#passcheck").hide();
		}
	}

	// Validate Confirm Password
	$("#conpasscheck").hide();
	let confirmPasswordError = true;
	$("#conpassword").keyup(function () {
		validateConfirmPassword();
	});
	function validateConfirmPassword() {
		let confirmPasswordValue = $("#conpassword").val();
		let passwordValue = $("#password").val();
		if (passwordValue != confirmPasswordValue) {
			$("#conpasscheck").show();
			$("#conpasscheck").html("**Password didn't Match");
			$("#conpasscheck").css("color", "red");
			confirmPasswordError = false;
			return false;
		} else {
			$("#conpasscheck").hide();
		}
	}

	function validateRegisterPage() {
		validateUsername();
		validatePassword();
		validateConfirmPassword();
		validateEmail();
		if (
			usernameError == true &&
			passwordError == true &&
			confirmPasswordError == true &&
			emailError == true
		) {
			return true;
		} else {
			return false;
		}
	}
});