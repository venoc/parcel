import { AreaModule } from './area.module';

describe('AreaModule', () => {
  let areaModule: AreaModule;

  beforeEach(() => {
    areaModule = new AreaModule();
  });

  it('should create an instance', () => {
    expect(areaModule).toBeTruthy();
  });
});
