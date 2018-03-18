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
import GroupService from "../../../services/group.service";
import NotificationService from "../../../services/notification.service";

const GroupComponent: ng.IComponentOptions = {
  bindings: {
    group: '<',
    members: '<',
    apiRoles: '<',
    applicationRoles: '<'
  },
  template: require("./group.html"),
  controller: function (
    GroupService: GroupService,
    NotificationService: NotificationService,
    $mdDialog: angular.material.IDialogService
  ) {
    'ngInject';

    this.$onInit = () => {
    };

    this.updateRole = (type: string, member_id: string) => {

    };

    this.removeUser = (ev, member: any) => {
      ev.stopPropagation();
      $mdDialog.show({
        controller: 'DialogConfirmController',
        controllerAs: 'ctrl',
        template: require('../../../components/dialog/confirmWarning.dialog.html'),
        clickOutsideToClose: true,
        locals: {
          msg: '',
          title: 'Would you like to remove the user "' + member.displayName + '" ?',
          confirmButton: 'Remove'
        }
      }).then( (response) => {
        if (response) {
          GroupService.deleteMember(this.group.id, member.id).then((response) => {
            NotificationService.show('User ' + member.displayName + ' has been removed.');
            GroupService.getMembers(this.group.id).then(response =>
              this.members = response.data
            );
          });
        }
      });
    };

    this.showAddMemberModal = (ev) => {
      $mdDialog.show({
        controller: 'DialogAddGroupMemberController',
        controllerAs: 'ctrl',
        template: require('./addMember.dialog.html'),
        clickOutsideToClose: true,
        locals: {
          group: this.group,
          apiRoles: this.apiRoles,
          applicationRoles: this.applicationRoles
        }
      }).then( (members) => {
        // if (members) {
        //   console.log(members);
        //   NotificationService.show('User ' + member.displayName + ' has been removed.');
        //   GroupService.getMembers(this.group.id).then(response =>
        //     this.members = response.data
        //   );
        // }
      }, () => {
        // you cancelled the dialog
      });
    };
  }
};

export default GroupComponent;

  /**
   showAddMemberModal(ev) {
    let _this = this;
    this.$mdDialog.show({
      controller: 'DialogAddGroupMemberController',
      template: require('./dialog/addMember.dialog.html'),
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      group: _this.selectedGroup
    }).then( (members) => {
      if (members) {
        console.log(members);
        _this.selectedGroup.members = _.unionWith(members, _this.selectedGroup.members, _.isEqual);
      }
    }, () => {
      // you cancelled the dialog
    });
  }

   removeMember(ev, member) {
    ev.stopPropagation();
    let _this = this;
    this.$mdDialog.show({
      controller: 'DialogConfirmController',
      controllerAs: 'ctrl',
      template: require('../../../components/dialog/confirmWarning.dialog.html'),
      clickOutsideToClose: true,
      locals: {
        msg: '',
        title: 'Would you like to remove the user "' + member.displayName + '" ?',
        confirmButton: 'Remove'
      }
    }).then((response) => {
      if (response) {
        _this.GroupService.deleteMember(_this.selectedGroup.group.id, member.id).then( () => {
          _this.NotificationService.show('Member ' + member.displayName + ' has been removed from the group');
          _.remove(_this.selectedGroup.members, (m: any) => {
            return m.id === member.id;
          });
        });
      }
    });
  }

   updateMember(member) {
    if (member.roles) {
      let _this = this;
      let promise = this.GroupService.addOrUpdateMember(this.selectedGroup.group.id, member);
      if (promise) {
        promise.then(() => {
          _this.NotificationService.show('Member ' + member.displayName + ' has been updated');
        });
      }
    }
  }**/