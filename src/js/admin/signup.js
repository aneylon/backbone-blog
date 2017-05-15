/* global
  Backbone
*/
let SignupView = Backbone.View.extend({
  eventBus,
  template: _.template($('#signupTemplate').html()),
  events: {
    'submit': 'onSubmit'
  },
  onSubmit (e) {
    e.preventDefault()
    $('#signupError').text('')

    let username = $('#signupUsername').val()
    let password = $('#signupPassword').val()
    let code = $('#signupCode').val()

    $.post(
      '/users/signup',
      { username, password, code },
      function(data, status) {
        console.log(data)
        if(data.success){
          $('#signupUsername').val('')
          $('#signupPassword').val('')
          $('#signupCode').val('')

          $(this).slideToggle()
        } else {
          
          $('#signupError').text(data.message)
        }
      }
    )
  },
  render () {
    this.$el.html(this.template)
    return this
  }
})
