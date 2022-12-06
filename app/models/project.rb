class Project < ApplicationRecord
  has_one_attached :logo
  has_one_attached :background_image
end
