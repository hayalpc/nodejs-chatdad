app.controller('chatController',['$scope',($scope)=>{
    $scope.roomList = [];
    $scope.onlineList = [];
    $scope.activeTab = 1;
    $scope.chatName = "";
    $scope.roomId = "";
    $scope.message = "";

    $scope.chatClicked = false;

    const socket = io.connect("http://chatdad.erdinckaraman.com");
    socket.on('onlineList',users=>{
        $scope.onlineList = users;
        $scope.$apply();
    });

    socket.on('roomList',rooms=>{
        $scope.roomList = rooms;
        $scope.$apply();
    });

    $scope.newMessage = ()=>{
        let message = $scope.message;
        $scope.message = "";

        console.log(message);
    };

    $scope.switchRoom = room => {
        $scope.roomId = room.id;
        $scope.chatName = room.roomName;
        $scope.chatClicked = true;
    };

    $scope.changeTab = tab =>{
        $scope.activeTab = tab;
    };

    $scope.newRoom = () => {
        let randomName = prompt('Oda İsmi Giriniz');
        if(randomName !== null && randomName !== ''){
            socket.emit('newRoom',randomName);
        }
    };



}]);