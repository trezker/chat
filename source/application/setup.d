module application.setup;

import mondo;
import boiler.model;

import application.user;

void setup_models(Mongo mongo, ref Model_method[string][string] models) {
	User_model user_model = new User_model;
	user_model.setup(mongo, models);
}
