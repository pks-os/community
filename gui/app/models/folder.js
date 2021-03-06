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

import { computed } from '@ember/object';
import attr from 'ember-data/attr';
import stringUtil from '../utils/string';
import Model from 'ember-data/model';

export default Model.extend({
	name: attr('string'),
	orgId: attr('string'),
	userId: attr('string'),
	folderType: attr('number', { defaultValue: 2 }),
	lifecycle: attr('number', { defaultValue: 1 }),
	likes: attr('string'),

	allowLikes: computed('likes', function () {
		return is.not.empty(this.get('likes')) && is.not.undefined(this.get('likes'));
	}),

	slug: computed('name', function () {
		return stringUtil.makeSlug(this.get('name'));
	}),

	markAsRestricted() {
		let constants = this.get('constants');
		this.set('folderType', constants.FolderType.Protected);
	},

	markAsPrivate() {
		let constants = this.get('constants');
		this.set('folderType', constants.FolderType.Private);
	},

	markAsPublic() {
		let constants = this.get('constants');
		this.set('folderType', constants.FolderType.Public);
	},

	// client-side prop that holds who can see this folder
	sharedWith: attr(),
	created: attr(),
	revised: attr()
});
