/* eslint-disable no-control-regex */

const code = (value: string) => value.replace(/[^0-9a-zA-Z]/g, '');

const ascii = (value: string) => value.replace(/[^\x00-\x7F]/g, '');

const integer = (value: string) => value.replace(/[^0-9]/g, '');

const pointer = (value: string) => value.replace(/[^0-9|/.]/g, '');

export const FilterUtil = {
	code,
	ascii,
	integer,
	pointer
};
