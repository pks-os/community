// Copyright 2016 Documize Inc. <legal@documize.com>. All rights reserved.
//
// This software (Documize Community Edition) is licensed under
// GNU AGPL v3 http://www.gnu.org/licenses/agpl-3.0.en.html
//
// You can operate outside the AGPL restrictions by purchasing
// Documize Enterprise Edition and obtaining a commercial license
// by contacting <sales@documize.com>.
//
// https://documize.com

import $ from 'jquery';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
	classNames: ['layout-footer', 'non-printable'],
	tagName: 'footer',
	appMeta: service(),

	init() {
		this._super(...arguments);
		this.eventBus.subscribe('notifyUser', this, 'handleEvent');
	},

	handleEvent(msg) {
		if (this.get('isDestroyed') || this.get('isDestroying')) return;

		if (msg === 'wait') {
			this.set('showWait', true);
			this.set('showDone', false);
		}

		if (msg === 'done') {
			$('.progress-done').removeClass('zoomOut').addClass('zoomIn');
			this.set('showWait', false);
			this.set('showDone', true);

			setTimeout(function() {
				$('.progress-done').removeClass('zoomIn').addClass('zoomOut');
			}, 3000);
		}
	}
});
