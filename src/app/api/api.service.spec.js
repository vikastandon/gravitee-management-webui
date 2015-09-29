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
/* global describe:false, beforeEach:false, it:false */
(function() {
  'use strict';

  describe('Services : ApiService', function(){

    var ApiService, httpBackend;

    beforeEach(function () {
      module('gravitee');

      inject(function (_ApiService_, _$httpBackend_) {
        ApiService = _ApiService_;
        httpBackend = _$httpBackend_;
      });
    });

    it('should list APIs', function () {
      httpBackend.expectGET('').respond(true);
      var data = false;
      ApiService.list().then(function (response) {
        data = response.data;
      });
      httpBackend.flush();
      expect(data).toBe(true);
    });

    it('should start API', function () {
      httpBackend.expectPOST('').respond(true);
      var data = false;
      ApiService.start('myAPI').then(function (response) {
        data = response.data;
      });
      httpBackend.flush();
      expect(data).toBe(true);
    });

    it('should stop API', function () {
      httpBackend.expectPOST('').respond(true);
      var data = false;
      ApiService.stop('myAPI').then(function (response) {
        data = response.data;
      });
      httpBackend.flush();
      expect(data).toBe(true);
    });

    it('should reload API', function () {
      httpBackend.expectPOST('').respond(true);
      var data = false;
      ApiService.reload('myAPI').then(function (response) {
        data = response.data;
      });
      httpBackend.flush();
      expect(data).toBe(true);
    });
  });
})();