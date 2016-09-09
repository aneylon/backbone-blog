console.log('test')

var fireBaseRef = new Firebase('https://flickering-torch-4028.firebaseio.com')

var myFunc = function(){
  var nameField = document.getElementById('inputName')
  var numberField = document.getElementById('inputNumber')
  var name = nameField.value
  var number = numberField.value

  var newThing = {
    name: name,
    number: number
  }

  fireBaseRef.push(newThing)

  console.log('name:',name,'number:',number)
  nameField.value = ''
  numberField.value = ''
}
