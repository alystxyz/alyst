class AlystController < ApplicationController
  include ActiveStorage::SetCurrent

  def index
    @projects = Project.all
  end
end
