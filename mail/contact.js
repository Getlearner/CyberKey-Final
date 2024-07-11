$(function () {
    // Initialize form validation
    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true, // Prevent default form submission
        submitError: function ($form, event, errors) {
            // Handle submit errors if needed
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // Prevent default form submission

            // Retrieve form data
            var name = $("input#name").val();
            var email = $("input#email").val();
            var subject = $("input#subject").val();
            var message = $("textarea#message").val();

            // Disable send button to prevent multiple submissions
            var $this = $("#sendMessageButton");
            $this.prop("disabled", true);

            // Send form data via AJAX
            $.ajax({
                url: "contact.php", // PHP script to handle form submission
                type: "POST",
                data: {
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                },
                cache: false,
                success: function () {
                    // On successful submission, show success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                    $('#success > .alert-success').append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success').append('</div>');

                    // Reset form fields
                    $('#contactForm').trigger("reset");
                },
                error: function () {
                    // On error, show error message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                    $('#success > .alert-danger').append($("<strong>").text("Sorry " + name + ", it seems that our mail server is not responding. Please try again later!"));
                    $('#success > .alert-danger').append('</div>');

                    // Reset form fields
                    $('#contactForm').trigger("reset");
                },
                complete: function () {
                    // Re-enable send button after a delay
                    setTimeout(function () {
                        $this.prop("disabled", false);
                    }, 1000);
                }
            });
        },
        filter: function () {
            return $(this).is(":visible"); // Apply validation only to visible elements
        },
    });

    // Handle tab click events (if any)
    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });

    // Clear success message when focusing on name field
    $('#name').focus(function () {
        $('#success').html('');
    });
});
