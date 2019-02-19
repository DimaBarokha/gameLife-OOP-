const functions= {
  bacteria: {
    isDead: false,
    checkAlive: (life)=>{
      if(life==false)
        return false;
      else
        return true;
    },
  },
};
module.exports = functions;
