barba.init({
  transitions: [{
    name: 'slide-transition',
    async leave(data) {
      // Animate the old page out
      await slideOut();
    },
    async enter(data) {
      // Animate the new page in
      slideIn();
    }
  }]
});
