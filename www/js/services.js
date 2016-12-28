angular.module('app.services', [])

.factory('Data', [function(){
    return { key: '', url: '', amount:'5', messaging: '',settingsSet: 'false',feeding: 'false' };
}])
