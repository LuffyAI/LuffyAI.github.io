function typeWriter(elementId, text, speed) {
    let i = 1;
    const target = document.getElementById(elementId);
    const interval = setInterval(() => {

      if (i == 0 ){
       target.innerHTML += text.charAt(0);
       i++;

      }


      if (i < text.length) {
        target.innerHTML += text.charAt(i);
        i++;
      } else {
        // Append the cursor span once the name is fully typed
        target.innerHTML += '<span class="vim-caret">!</span>';
        clearInterval(interval);
      }
    }, speed);
  }
  
  // Trigger the animation
  typeWriter('typed-name', 'GO BLUE', 200); // Adjust the speed as necessary
