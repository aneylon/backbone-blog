/* global
  $
*/
$('body').on('click', '.toggle', function () {
  $(this).siblings().slideToggle()
})
