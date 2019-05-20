import LoadingContainer from "../Components/common/LoadingContainer";

export const expectComponent = (wrapper, Component) => expect(
  wrapper.find(Component).length
).toBe(1);


export const expectIsLoading = (wrapper) => expect(
  wrapper.find(LoadingContainer).first().prop('loading')
).toBe(true);
