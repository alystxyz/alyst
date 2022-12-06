json.extract! project, :id, :name, :category, :website, :discord, :twitter, :github, :logo, :background_image, :created_at, :updated_at
json.url project_url(project, format: :json)
json.logo url_for(project.logo)
json.background_image url_for(project.background_image)
