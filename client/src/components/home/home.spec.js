/**
 * Created by Amit Thakkar on 03/05/15.
 */
describe('Home Module Controller test cases', function () {
    var homeController,
        scope;
    beforeEach(angular.mock.module("angular-amd.home"));
    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        homeController = $controller('HomeController', {
            $scope: scope
        });
    }));
    it('check that page is having right text', function () {
        expect(homeController.page).toEqual('Home Page Home Service');
    });
});