deploy:
	rsync -arvuz public/* $$HOMEPAGE_DEPLOY_DESTINATION
