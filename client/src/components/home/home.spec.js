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
describe('Home Module, Service test cases', function () {
    var homeService;
    beforeEach(angular.mock.module("angular-amd.home"));
    beforeEach(inject(function (_HomeService_) {
        homeService = _HomeService_;
    }));
    it('checks service a name', function () {
        //dump(homeService.getName());
        expect(homeService.getName()).toEqual('Home Service');
    });
});