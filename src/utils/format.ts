const rocDate = (value: string) => {
	if (value?.length === 7) {
		return [value.slice(0,3), value.slice(3,5), value.slice(5)].join('/');
	} else {
		return '';
	}
}

export const FormatUtil = {
	rocDate,
};
