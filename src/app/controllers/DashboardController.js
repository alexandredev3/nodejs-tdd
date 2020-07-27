class DashboardController {
  async index(request, response) {
    return response.status(200).send();
  }
}

export default DashboardController;
