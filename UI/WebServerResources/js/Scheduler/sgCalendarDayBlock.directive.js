/* -*- Mode: javascript; indent-tabs-mode: nil; c-basic-offset: 2 -*- */

(function() {
  'use strict';

  /*
   * sgCalendarDayBlock - An event block to be displayed in a week
   * @memberof SOGo.SchedulerUI
   * @restrict element
   * @param {object} sgBlock - the event block definition
   * @param {function} sgClick - the function to call when clicking on a block.
   *        Two variables are available: clickEvent (the event that triggered the mouse click),
   *        and clickComponent (a Component object)
   *
   * @example:

   <sg-calendar-day-block
      ng-repeat="block in blocks[day]"
      sg-block="block"
      sg-click="open(clickEvent, clickComponent)" />
  */
  sgCalendarDayBlock.$inject = ['CalendarSettings'];
  function sgCalendarDayBlock(CalendarSettings) {
    return {
      restrict: 'E',
      scope: {
        block: '=sgBlock',
        clickBlock: '&sgClick'
      },
      replace: true,
      template: [
        '<div class="sg-event sg-draggable-calendar-block"',
        //    Add a class while dragging
        '     ng-class="{\'sg-event--dragging\': block.dragging}">',
        '  <div class="eventInside" ng-click="clickBlock({clickEvent: $event, clickComponent: block.component})">',
        '    <div class="text">{{ block.component.summary }}',
        '      <span class="icons">',
        //       Component is reccurent
        '        <md-icon ng-if="block.component.occurrenceId" class="material-icons icon-repeat"></md-icon>',
        //       Component has an alarm
        '        <md-icon ng-if="block.component.c_nextalarm" class="material-icons icon-alarm"></md-icon>',
        //       Component is confidential
        '        <md-icon ng-if="block.component.c_classification == 1" class="material-icons icon-visibility-off"></md-icon>',
        //       Component is private
        '        <md-icon ng-if="block.component.c_classification == 2" class="material-icons icon-vpn-key"></md-icon>',
        '      </span>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join(''),
      link: link
    };

    function link(scope, iElement, attrs) {
      var pc, left, right;

      // Compute overlapping (2%)
      pc = 100 / scope.block.siblings;
      left = scope.block.position * pc;
      right = 100 - (scope.block.position + 1) * pc;
      if (pc < 100) {
        if (left > 0)
          left -= 2;
        if (right > 0)
          right -= 2;
      }

      // Add some padding (2%)
      if (left === 0)
        left = 2;
      if (right === 0)
        right = 2;

      // Set position
      iElement.css('left', left + '%');
      iElement.css('right', right + '%');
      iElement.addClass('starts' + scope.block.start);
      iElement.addClass('lasts' + scope.block.length);

      // Set background color
      iElement.addClass('bg-folder' + scope.block.component.pid);
    }
  }

  angular
    .module('SOGo.SchedulerUI')
    .directive('sgCalendarDayBlock', sgCalendarDayBlock);
})();