
    exports.getPeerId=(req, res) =>{
      return res.json({ peerId: req.query.peerId });
    }
  
    exports.initiateCall=(req, res, io, clients)=> {
      const { targetId } = req.body;
  
      if (!clients[targetId]) {
        return res.status(400).send('Invalid target ID');
      }
  
      io.to(targetId).emit('incoming-call', req.socket.id);
      return res.sendStatus(200);
    }
  
    exports.answerCall=(req, res, io, clients) =>{
      const { targetId } = req.body;
  
      if (!clients[targetId]) {
        return res.status(400).send('Invalid target ID');
      }
  
      io.to(targetId).emit('call-answer', req.socket.id);
      return res.sendStatus(200);
    }
  
    exports.hangupCall=(req, res, io, clients) =>{
      const { targetId } = req.body;
  
      if (!clients[targetId]) {
        return res.status(400).send('Invalid target ID');
      }
  
      io.to(targetId).emit('hangup');
      return res.sendStatus(200);
    }
  