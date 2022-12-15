class CreateCampaigns < ActiveRecord::Migration[7.0]
  def change
    create_table :campaigns do |t|
      t.string :name
      t.integer :target_amount
      t.datetime :period_of_time
      t.string :contract_address

      t.timestamps
    end
  end
end
