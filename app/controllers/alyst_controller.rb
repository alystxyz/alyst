class AlystController < ApplicationController
  include ActiveStorage::SetCurrent

  def index
    @projects = Project.where(active: true)
  end
end
