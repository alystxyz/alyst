json.extract! campaign, :id, :name, :target_amount, :period_of_time, :created_at, :updated_at
json.url campaign_url(campaign, format: :json)
