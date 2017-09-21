import { FormsReactiveAssignmentStartPage } from './app.po';

describe('forms-reactive-assignment-start App', () => {
  let page: FormsReactiveAssignmentStartPage;

  beforeEach(() => {
    page = new FormsReactiveAssignmentStartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
