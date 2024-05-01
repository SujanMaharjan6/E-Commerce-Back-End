

module.exports = function (obj1, obj2) {
    if (obj2.Name)
        obj1.Name = obj2.Name
    if (obj2.Gender)
        obj1.Gender = obj2.Gender
    if (obj2.Username)
        obj1.Username = obj2.Username
    if (obj2.Password)
        obj1.Password = obj2.Password
    if (obj2.DoB)
        obj1.DoB = obj2.DoB
    if (obj2.Role)
        obj1.Role = obj2.Role
    if (obj2.Status)
        obj1.Status = obj2.Status
    if (obj2.Email)
        obj1.Email = obj2.Email
    if (obj2.temp)
        obj1.Address.temp = obj2.temp.split(',')
    if (obj2.perm)
        obj1.Address.perm = obj2.perm
    if (obj2.Image)
        obj1.Image = obj2.Image

    return obj1;
}