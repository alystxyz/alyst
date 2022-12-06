class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :category
      t.text :website
      t.text :discord
      t.text :twitter
      t.text :github

      t.timestamps
    end
  end
end
