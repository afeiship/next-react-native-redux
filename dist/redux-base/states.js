module.exports={
  getUpdate:function(inStore){
    return inStore.getState();
  },
  getRoot:function(inStore){
    return inStore.getState().__root__;
  },
  getError:function(inStore){
    return inStore.getState().__error__;
  },
  getMemory:function(inStore){
    return inStore.getState().__memory__;
  },
  getRequest:function(inStore){
    return inStore.getState().__request__;
  }
};
