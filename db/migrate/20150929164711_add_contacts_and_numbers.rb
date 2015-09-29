class AddContactsAndNumbers < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :firstname
      t.string :lastname
      t.string :email
      t.timestamps null: false
    end

    create_table :numbers do |t|
      t.references :contact
      t.string :label
      t.string :number
      t.timestamps null: false
    end
  end
end
