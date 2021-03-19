console.log('this is content.js')
const titleEl = document.getElementsByTagName('title')
if (titleEl.length) {
  titleEl[0].innerText = 'from content js'
}
