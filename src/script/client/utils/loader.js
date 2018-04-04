exports.spin = spin => {
  if(spin === true) {
    document.getElementById('overlay').style.width = '100%';
  } else {
    document.getElementById('overlay').style.width = '0';
  }
};
