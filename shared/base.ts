import { test as base, request } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
// import { RegistrationPage } from '../pages/RegistrationPage';
// import { DashboardPage } from '../pages/DashboardPage';
// import { APIModel } from '../pages/api.model';
// import { FakeStoreAPI } from '../pages/api-fake-store.model';

type MyFixtures = {
  InventoryPage: InventoryPage;
  LoginPage: LoginPage;
  // registrationPage: RegistrationPage;
  // dashboardPage: DashboardPage;
//   apiJsonPlaceholder: APIModel;
//   fakeStoreAPI: FakeStoreAPI;
};

export const test = base.extend<MyFixtures>({
  InventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },


  LoginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  // registrationPage: async ({ page }, use) => {
  //   await use(new RegistrationPage(page));
  // },
  // dashboardPage: async ({ page }, use) => {
  //   await use(new DashboardPage(page));
  // },
//   apiJsonPlaceholder: async ({}, use) => {
//     const requestContext = await request.newContext({
//       baseURL: 'https://jsonplaceholder.typicode.com',
//     });
//     const apiModel = new APIModel(requestContext);
//     await use(apiModel);
//     await requestContext.dispose();
//   },
//   fakeStoreAPI: async ({}, use) => {
//     const requestContext = await request.newContext({
//       baseURL: 'https://fakestoreapi.com',
//     });
//     const fakeStore = new FakeStoreAPI(requestContext);
//     await use(fakeStore);
//     await requestContext.dispose();
//   },
});

export { expect } from '@playwright/test';