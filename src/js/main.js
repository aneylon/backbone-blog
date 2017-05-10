$('body').on('click', '.toggle', function() {
  console.log('clicked toggle')
  $(this).siblings().slideToggle()
})
