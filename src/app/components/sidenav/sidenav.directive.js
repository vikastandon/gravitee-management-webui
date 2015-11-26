/*
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class SideNavDirective {
  constructor () {
    let directive = {
      restrict: 'E',
      templateUrl: 'app/components/sidenav/sidenav.html',
      controller: SideNavController,
      controllerAs: 'sidenavCtrl',
      bindToController: true
    };

    return directive;
  }
}

class SideNavController {
  constructor ($rootScope, $cookieStore) {
    'ngInject';
		this.$rootScope = $rootScope;
		this.$cookieStore = $cookieStore;
		this.getUser();
		var self = this;
		this.$rootScope.$watch('authenticated', function() {
			self.getUser();
		});
  }

	getUser() {
		this.user = this.$cookieStore.get('authenticatedUser');
	}
}

export default SideNavDirective;
