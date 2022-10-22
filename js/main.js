function cargarReloj() {
  // Haciendo uso del objeto Date() obtenemos la hora, minuto y segundo
  var fechahora = new Date();
  var hora = fechahora.getHours();
  var minuto = fechahora.getMinutes();
  var segundo = fechahora.getSeconds();

  // Variable meridiano con el valor 'AM'
  var meridiano = "PM";

  // Si la hora es igual a 0, declaramos la hora con el valor 12
  if (hora == 0) {
    hora = 12;
  }

  // Si la hora es mayor a 12, restamos la hora - 12 y mostramos la variable meridiano con el valor 'PM'
  if (hora > 12) {
    hora = hora - 12;

    // Variable meridiano con el valor 'PM'
    meridiano = "AM";
  }

  // Formateamos los ceros '0' del reloj
  hora = hora < 10 ? "0" + hora : hora;
  minuto = minuto < 10 ? "0" + minuto : minuto;
  segundo = segundo < 10 ? "0" + segundo : segundo;

  // Enviamos la hora a la vista HTML
  var tiempo = hora + ":" + minuto + ":" + segundo + " " + meridiano;
  document.getElementById("relojnumerico").innerText = tiempo;
  document.getElementById("relojnumerico").textContent = tiempo;

  // Cargamos el reloj a los 500 milisegundos
  setTimeout(cargarReloj, 500);
}

$("#marcar").click((e) => {
  e.preventDefault();
  const tipo = $("#tipo").val() || "undefined";
  const codigo = $("#codigo").val() || "undefined";
  const ip = $("#ip").val() || "undefined";
  if (tipo == "undefined") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No se ingreso tipo!",
    });
  } else if (codigo == "undefined") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No se ingreso código!",
    });
  } else {
    $.post(
      "app.php",
      {
        tipo,
        codigo,
        ip,
      },
      (data) => {
        if (data == "no-code") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Datos ingresados incorrectos!",
          });
        } else if (data == "ip-no-authorized") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Conectese a la red NHG!",
            footer: "Si no se funciona informe el problema",
          });
        } else if (data == "no-exists") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Código inválido!",
          });
        } else {
          Swal.fire("Bienvenido a NHG!", data, "success");
          $("#tipo").val(1) || "undefined";
          $("#codigo").val("") || "undefined";
          $("#general-container").html(
            `<span class="login100-form-title p-b-53">
                Asistencia <img src="./images/logo.png" class="logo">
                <br>
                Gracias por Registrarte!
            </span>`
            );
        }
      }
    );
  }
});

// Ejecutamos la función 'CargarReloj'
cargarReloj();

(function ($) {
  "use strict";

  /*==================================================================
    [ Validate ]*/
  var input = $(".validate-input .input100");

  $(".validate-form").on("submit", function () {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }

    return check;
  });

  $(".validate-form .input100").each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function validate(input) {
    if ($(input).attr("type") == "email" || $(input).attr("name") == "email") {
      if (
        $(input)
          .val()
          .trim()
          .match(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
          ) == null
      ) {
        return false;
      }
    } else {
      if ($(input).val().trim() == "") {
        return false;
      }
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass("alert-validate");
  }
})(jQuery);
