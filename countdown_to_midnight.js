// This example shows how to load HTML into a web view. You can also load both CSS styling and JavaScript into the web view.
// Web views can be displayed in a Siri Shortcut.
// Note that this example uses the loadHTML() function of the WebView bridge. However, typically you would store your HTML and assets in the Scriptable folder in iCloud Drive and edit your HTML files using a suitable app, eg. Textastic. Then you can use the loadFile() function on the web view to load the HTML file.
function runner() {
  // Date we want to countdown to
  let targetDate = new Date()
  targetDate.setHours(24, 0, 0, 0)
  let targetTime = targetDate.getTime()
  const minInMs = 1000 * 60
  const hourInMs = minInMs * 60
  const dayInMs = hourInMs * 24
  // Create a timer to update the time
  let prev = undefined
  let timer = setInterval(function() {
    const now = new Date().getTime()
    const distance = targetTime - now
    // Ensure to only update every second
    const rounded = now - (now % 1000)
    if (prev === rounded) {
      return
    }
    prev = rounded 
    const hours = Math.floor((distance % dayInMs) / hourInMs)
    let minutes = Math.floor((distance % hourInMs) / minInMs)
    let seconds = Math.floor((distance % minInMs) / 1000)
    if (hours > 0 && minutes > 0 && seconds < 10) seconds = `0${seconds}`
    if (hours > 0 && minutes < 10) minutes = `0${minutes}`
    let time;
    if (hours > 0 && minutes > 0) {
      time = `${hours}:${minutes}:${seconds}`
    } else if (minutes > 0) {
      time = `${minutes}:${seconds}`
    } else {
      time = `${seconds} ${seconds == 1 ? 'second' : 'seconds'}`
    }
    // Update the element with id="countdown"
    const e = document.getElementById("countdown")
    e.innerHTML = `${time} to midnight`      
    // e.innerHTML = new Date(now).toISOString()
    if (distance <= 0) {
      clearInterval(timer)
    }
  }, 300)
}
let html = `
<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;"/>
<style>
body {
  font-family: -apple-system;
  font: -apple-system-headline;
  height: 100%;
}
#container {
  display: table;
  width: 100%;
  height: 100%;
}
#countdown {
  text-align: center;
  font-size: 20pt;
  min-height: 10em;
  display: table-cell;
  vertical-align: middle;
}
</style>
<div id="container">
  <div id="countdown"></div>
</div>
<script>
(${runner.toString()})()
</script>
`
// console.log(html)
WebView.loadHTML(html, null, new Size(0, 100))
// It is good practice to call Script.complete() at the end of a script, especially when the script is used with Siri or in the Shortcuts app. This lets Scriptable report the results faster. Please see the documentation for details.
Script.complete()
