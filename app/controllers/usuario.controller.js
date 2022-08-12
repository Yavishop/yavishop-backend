exports.allAccesos = (req, res) => {
    res.status(200).send("Contenido Publico.");
  };
  
  exports.userTablero = (req, res) => {
    res.status(200).send("Contenido Usuario.");
  };
  
  exports.adminTablero = (req, res) => {
    res.status(200).send("Contenido Admin");
  };
  
  exports.moderadorTablero = (req, res) => {
    res.status(200).send("Contenido Moderador");
  };